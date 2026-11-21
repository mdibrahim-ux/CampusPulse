import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { documentOptions, scholarshipSchemes } from "@/lib/scholarships";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statuses = [
  "Interested",
  "Preparing",
  "Applied",
  "Under verification",
  "Defected",
  "Rejected",
  "Approved",
  "Awarded",
  "Withdrawn",
] as const;

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const schemeIds = new Set(scholarshipSchemes.map((scheme) => scheme.id));
const documentIds = new Set<string>(documentOptions.map((document) => document.id));

const profileSchema = z.object({
  name: z.string().max(120),
  institution: z.string().max(180),
  degree: z.string().max(120),
  branch: z.string().max(120),
  year: z.string().max(40),
  state: z.string().max(80),
  city: z.string().max(100),
  cgpa: z.string().max(10).refine((value) => {
    if (!value.trim()) return true;
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 && number <= 10;
  }, "CGPA must be between 0 and 10."),
  skills: z.array(z.string().max(80)).max(40),
  interests: z.array(z.string().max(80)).max(40),
  preferredMode: z.string().max(40),
}).strict();

const trackerItemSchema = z.object({
  opportunityId: z.string().min(1).max(100),
  status: z.enum(statuses),
  notes: z.string().max(5000),
  nextAction: z.string().max(500),
  reminderDate: z.string().refine((value) => value === "" || datePattern.test(value)),
  updatedAt: z.string().max(50),
}).strict();

const reminderSchema = z.object({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(240),
  date: z.string().regex(datePattern),
  kind: z.enum(["Provider deadline", "Personal reminder"]),
  done: z.boolean(),
  opportunityId: z.string().max(100).optional(),
}).strict();

const documentChecksSchema = z.record(
  z.string().max(100),
  z.array(z.string().min(1).max(80)).max(40),
);

const syncSchema = z.object({
  profile: profileSchema.optional(),
  tracker: z.array(trackerItemSchema).max(250).optional(),
  reminders: z.array(reminderSchema).max(250).optional(),
  documentChecks: documentChecksSchema.optional(),
}).strict();

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function getAuthenticatedClient() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { supabase: null, user: null };

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { supabase, user: null };

  return { supabase, user: data.user };
}

export async function GET() {
  try {
    const auth = await getAuthenticatedClient();
    if (!auth.supabase) return jsonError("Cloud sync is not configured. Add the Supabase environment variables.", 503);
    if (!auth.user) return jsonError("Sign in to access your cloud data.", 401);

    const userId = auth.user.id;
    const [profileResult, trackerResult, remindersResult, checksResult] = await Promise.all([
      auth.supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      auth.supabase.from("saved_schemes").select("*").eq("user_id", userId).order("updated_at", { ascending: false }),
      auth.supabase.from("student_reminders").select("*").eq("user_id", userId).order("due_date", { ascending: true }),
      auth.supabase.from("document_checklists").select("*").eq("user_id", userId),
    ]);

    if (profileResult.error || trackerResult.error || remindersResult.error || checksResult.error) {
      return jsonError("Cloud data tables are not ready. Apply the CampusPulse user-data migration and try again.", 503);
    }

    const profileRow = profileResult.data;
    const profile = profileRow ? {
      name: profileRow.full_name || "",
      institution: profileRow.institution || "",
      degree: profileRow.degree || "",
      branch: profileRow.branch || "",
      year: profileRow.study_year || "",
      state: profileRow.state || "",
      city: profileRow.city || "",
      cgpa: profileRow.cgpa === null ? "" : String(profileRow.cgpa),
      skills: profileRow.skills || [],
      interests: profileRow.interests || [],
      preferredMode: profileRow.preferred_mode || "Any",
    } : null;

    const tracker = (trackerResult.data || []).map((row) => ({
      opportunityId: row.scheme_id,
      status: row.status,
      notes: row.notes || "",
      nextAction: row.next_action || "",
      reminderDate: row.reminder_date || "",
      updatedAt: row.updated_at || new Date().toISOString(),
    }));

    const reminders = (remindersResult.data || []).map((row) => ({
      id: row.id,
      title: row.title,
      date: row.due_date,
      kind: row.kind,
      done: row.completed,
      ...(row.scheme_id ? { opportunityId: row.scheme_id } : {}),
    }));

    const documentChecks = Object.fromEntries(
      (checksResult.data || []).map((row) => [row.scheme_id, row.checked_document_ids || []]),
    );

    return NextResponse.json({ profile, tracker, reminders, documentChecks });
  } catch {
    return jsonError("Unable to load cloud data right now.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 256 * 1024) return jsonError("The sync payload is larger than the 256 KB limit.", 413);

    const auth = await getAuthenticatedClient();
    if (!auth.supabase) return jsonError("Cloud sync is not configured. Add the Supabase environment variables.", 503);
    if (!auth.user) return jsonError("Sign in to back up your data.", 401);

    const body = await request.json();
    const parsed = syncSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("The local data payload is invalid. Review the profile, tracker and reminder values.", 400);
    }

    const payload = parsed.data;
    const userId = auth.user.id;

    if (payload.tracker?.some((item) => !schemeIds.has(item.opportunityId))) {
      return jsonError("The tracker contains a scheme that is not in the CampusPulse catalogue.", 400);
    }
    if (payload.reminders?.some((item) => item.opportunityId && !schemeIds.has(item.opportunityId))) {
      return jsonError("A reminder references an unknown CampusPulse scheme.", 400);
    }
    if (payload.documentChecks) {
      for (const [schemeId, ids] of Object.entries(payload.documentChecks)) {
        if (!schemeIds.has(schemeId) || ids.some((id) => !documentIds.has(id))) {
          return jsonError("The document checklist contains an unknown scheme or document type.", 400);
        }
      }
    }

    if (payload.profile) {
      const profile = payload.profile;
      const { error } = await auth.supabase.from("profiles").upsert({
        id: userId,
        full_name: profile.name,
        institution: profile.institution,
        degree: profile.degree,
        branch: profile.branch,
        study_year: profile.year,
        state: profile.state,
        city: profile.city,
        cgpa: profile.cgpa.trim() ? Number(profile.cgpa) : null,
        skills: profile.skills,
        interests: profile.interests,
        preferred_mode: profile.preferredMode,
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" });
      if (error) return jsonError("Profile backup failed. Confirm the database migration is applied.", 503);
    }

    if (payload.tracker?.length) {
      const rows = payload.tracker.map((item) => ({
        user_id: userId,
        scheme_id: item.opportunityId,
        status: item.status,
        notes: item.notes,
        next_action: item.nextAction,
        reminder_date: item.reminderDate || null,
        updated_at: Number.isNaN(Date.parse(item.updatedAt)) ? new Date().toISOString() : new Date(item.updatedAt).toISOString(),
      }));
      const { error } = await auth.supabase.from("saved_schemes").upsert(rows, { onConflict: "user_id,scheme_id" });
      if (error) return jsonError("Tracker backup failed. Confirm the database migration is applied.", 503);
    }

    if (payload.reminders?.length) {
      const rows = payload.reminders.map((item) => ({
        user_id: userId,
        id: item.id,
        title: item.title,
        due_date: item.date,
        kind: item.kind,
        completed: item.done,
        scheme_id: item.opportunityId || null,
      }));
      const { error } = await auth.supabase.from("student_reminders").upsert(rows, { onConflict: "user_id,id" });
      if (error) return jsonError("Reminder backup failed. Confirm the database migration is applied.", 503);
    }

    if (payload.documentChecks) {
      const rows = Object.entries(payload.documentChecks).map(([schemeId, ids]) => ({
        user_id: userId,
        scheme_id: schemeId,
        checked_document_ids: Array.from(new Set(ids)),
        updated_at: new Date().toISOString(),
      }));
      if (rows.length) {
        const { error } = await auth.supabase.from("document_checklists").upsert(rows, { onConflict: "user_id,scheme_id" });
        if (error) return jsonError("Document-checklist backup failed. Confirm the database migration is applied.", 503);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Local data backed up. Existing cloud-only records were kept.",
      saved: {
        profile: Boolean(payload.profile),
        trackerItems: payload.tracker?.length || 0,
        reminders: payload.reminders?.length || 0,
        documentChecklists: Object.keys(payload.documentChecks || {}).length,
      },
    });
  } catch {
    return jsonError("Unable to back up your data right now.", 500);
  }
}
