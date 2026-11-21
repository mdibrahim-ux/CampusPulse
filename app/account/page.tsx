"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
  Cloud,
  Database,
  KeyRound,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { blankProfile } from "@/lib/data";
import {
  getDocumentChecks,
  getProfile,
  getReminders,
  getTracker,
  saveDocumentChecks,
  saveProfile,
  saveReminders,
  saveTracker,
} from "@/lib/storage";
import type { Reminder, StudentProfile, TrackerItem } from "@/lib/types";

type AccountUser = { id: string; email?: string };

type CloudSnapshot = {
  profile: StudentProfile | null;
  tracker: TrackerItem[];
  reminders: Reminder[];
  documentChecks: Record<string, string[]>;
};

export default function AccountPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [user, setUser] = useState<AccountUser | null>(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }

    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user ? { id: data.user.id, email: data.user.email } : null);
        setReady(true);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const showMessage = (text: string, type: "success" | "error" | "info" = "info") => {
    setMessage(text);
    setMessageType(type);
  };

  const sendCode = async () => {
    if (!supabase) return;
    const value = email.trim().toLowerCase();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showMessage("Enter a valid email address.", "error");
      return;
    }

    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email: value,
      options: { shouldCreateUser: true },
    });
    setLoading(false);

    if (error) {
      showMessage("We could not send a sign-in code. Check the Supabase email configuration and try again.", "error");
      return;
    }

    setEmail(value);
    setOtpSent(true);
    showMessage("A one-time code has been sent to your email address. Check your inbox and spam folder.", "success");
  };

  const verifyCode = async () => {
    if (!supabase) return;
    const code = otp.trim();
    if (!/^\d{6}$/.test(code)) {
      showMessage("Enter the six-digit code from your email.", "error");
      return;
    }

    setLoading(true);
    setMessage("");
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code,
      type: "email",
    });
    setLoading(false);

    if (error || !data.user) {
      showMessage("That code could not be verified. It may have expired or already been used.", "error");
      return;
    }

    setUser({ id: data.user.id, email: data.user.email });
    setOtp("");
    setOtpSent(false);
    showMessage("You're signed in. You can now back up your local CampusPulse data.", "success");
  };

  const signOut = async () => {
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) {
      showMessage("We could not end this session. Please try again.", "error");
      return;
    }
    setUser(null);
    showMessage("You have been signed out of this browser.", "success");
  };

  const backUpLocalData = async () => {
    setLoading(true);
    setMessage("");
    try {
      const body = {
        profile: getProfile(),
        tracker: getTracker(),
        reminders: getReminders(),
        documentChecks: getDocumentChecks(),
      };
      const response = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Backup failed.");
      showMessage(
        "Backup complete: " + result.saved.trackerItems + " saved schemes, "
          + result.saved.reminders + " reminders and "
          + result.saved.documentChecklists + " document checklists.",
        "success",
      );
    } catch (error) {
      showMessage(error instanceof Error ? error.message : "Backup failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const restoreCloudData = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/sync", { cache: "no-store" });
      const result = await response.json() as CloudSnapshot & { error?: string };
      if (!response.ok) throw new Error(result.error || "Restore failed.");

      saveProfile(result.profile || blankProfile);
      saveTracker(result.tracker || []);
      saveReminders(result.reminders || []);
      saveDocumentChecks(result.documentChecks || {});

      window.dispatchEvent(new Event("campuspulse-profile"));
      window.dispatchEvent(new Event("campuspulse-tracker"));
      window.dispatchEvent(new Event("campuspulse-reminders"));

      showMessage("Cloud data restored to this browser. Your current local tracker and reminders were replaced by the account snapshot.", "success");
    } catch (error) {
      showMessage(error instanceof Error ? error.message : "Restore failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const localTrackerCount = ready && typeof window !== "undefined" ? getTracker().length : 0;
  const localReminderCount = ready && typeof window !== "undefined" ? getReminders().length : 0;

  return (
    <div className="cp-account-page">
      <section className="cp-account-hero">
        <div>
          <span className="cp-account-kicker"><Cloud size={15} /> YOUR ACCOUNT / CLOUD BACKUP</span>
          <h1>Your student workspace, <span>wherever you sign in.</span></h1>
          <p>Connect an email account to back up your profile, saved schemes, reminders and preparation checklists across devices.</p>
        </div>
        <div className="cp-account-hero-mark"><Database size={38} /><span>PRIVATE<br />BY DEFAULT</span></div>
      </section>

      <div className="cp-account-grid">
        <section className="cp-account-panel cp-account-main-panel">
          <div className="cp-account-panel-heading">
            <span className="cp-account-icon"><UserRound size={19} /></span>
            <div><span>01 / ACCOUNT ACCESS</span><h2>{user ? "Account connected" : "Sign in with email"}</h2></div>
          </div>

          {!supabase ? (
            <div className="cp-account-setup-state">
              <KeyRound size={22} />
              <h3>Supabase connection is not configured yet.</h3>
              <p>Add your own CampusPulse Supabase Project URL and publishable key to the local environment, then restart the app.</p>
              <code>NEXT_PUBLIC_SUPABASE_URL</code>
              <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>
            </div>
          ) : !ready ? (
            <div className="cp-account-loading">Checking your sign-in session…</div>
          ) : user ? (
            <div className="cp-account-signed-in">
              <div className="cp-account-user">
                <span className="cp-account-avatar"><UserRound size={20} /></span>
                <span><strong>{user.email || "Signed-in student"}</strong><small>Authenticated with Supabase email OTP</small></span>
                <span className="cp-account-connected"><CheckCircle2 size={14} /> Connected</span>
              </div>
              <button type="button" className="cp-account-secondary-action" disabled={loading} onClick={signOut}>
                <LogOut size={16} /> Sign out of this browser
              </button>
            </div>
          ) : (
            <div className="cp-account-auth-form">
              {!otpSent ? (
                <>
                  <label className="cp-account-field">
                    <span>Email address</span>
                    <div><Mail size={17} /><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
                  </label>
                  <button type="button" className="cp-account-primary-action" disabled={loading} onClick={sendCode}>
                    {loading ? "Sending code…" : "Send one-time code"} <ArrowRightIcon />
                  </button>
                  <p className="cp-account-help">No password is required. A six-digit sign-in code will be sent to your email.</p>
                </>
              ) : (
                <>
                  <div className="cp-account-code-context"><Mail size={17} /><span>Code sent to <strong>{email}</strong></span></div>
                  <label className="cp-account-field">
                    <span>Six-digit email code</span>
                    <input className="cp-account-otp-input" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" />
                  </label>
                  <button type="button" className="cp-account-primary-action" disabled={loading} onClick={verifyCode}>
                    {loading ? "Verifying…" : "Verify and sign in"} <ArrowRightIcon />
                  </button>
                  <button type="button" className="cp-account-quiet-action" disabled={loading} onClick={() => { setOtpSent(false); setOtp(""); showMessage(""); }}>
                    Use a different email address
                  </button>
                </>
              )}
            </div>
          )}

          {message && (
            <div className={"cp-account-message is-" + messageType} role="status">
              {messageType === "success" ? <CheckCircle2 size={17} /> : <ShieldCheck size={17} />}
              <span>{message}</span>
            </div>
          )}
        </section>

        <aside className="cp-account-panel cp-account-privacy-panel">
          <span className="cp-account-eyebrow">DATA BOUNDARIES</span>
          <h2>What syncs to your account?</h2>
          <div className="cp-account-data-list">
            <div><CheckCircle2 size={16} /><span><strong>Student profile</strong><small>Study details and preferences</small></span></div>
            <div><CheckCircle2 size={16} /><span><strong>Saved scholarships</strong><small>Progress, notes and next actions</small></span></div>
            <div><CheckCircle2 size={16} /><span><strong>Reminders</strong><small>Dates, titles and completion state</small></span></div>
            <div><CheckCircle2 size={16} /><span><strong>Document checklists</strong><small>Checked item IDs only, not files</small></span></div>
          </div>
          <div className="cp-account-privacy-note">
            <ShieldCheck size={18} />
            <p>Uploaded documents and AI analysis content are not included in cloud backup. Never store Aadhaar, OTR or bank numbers in profile notes.</p>
          </div>
        </aside>
      </div>

      {user && (
        <section className="cp-account-panel cp-account-sync-panel">
          <div className="cp-account-panel-heading">
            <span className="cp-account-icon cp-account-icon-blue"><ArrowUpFromLine size={19} /></span>
            <div><span>02 / DATA PORTABILITY</span><h2>Back up this browser or restore an account snapshot.</h2></div>
          </div>
          <div className="cp-account-local-stats">
            <div><strong>{localTrackerCount}</strong><span>LOCAL SAVED SCHEMES</span></div>
            <div><strong>{localReminderCount}</strong><span>LOCAL REMINDERS</span></div>
            <div><strong>4</strong><span>DATA GROUPS</span></div>
          </div>
          <div className="cp-account-sync-actions">
            <button type="button" className="cp-account-primary-action" disabled={loading} onClick={backUpLocalData}>
              <ArrowUpFromLine size={16} /> {loading ? "Working…" : "Back up local data to my account"}
            </button>
            <button type="button" className="cp-account-secondary-action" disabled={loading} onClick={restoreCloudData}>
              <ArrowDownToLine size={16} /> Restore account data to this browser
            </button>
          </div>
          <p className="cp-account-sync-note">Backup merges by record ID and keeps cloud-only rows. Restore replaces this browser’s current profile, tracker, reminders and document-checklist state with the account snapshot.</p>
        </section>
      )}

      <section className="cp-account-footer-note">
        <ShieldCheck size={18} />
        <p>CampusPulse uses the signed-in account identity and database row-level security to separate student data. Your account is optional; local-first browsing remains available without sign-in.</p>
        <Link href="/profile">Review your profile</Link>
      </section>
    </div>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true">→</span>;
}
