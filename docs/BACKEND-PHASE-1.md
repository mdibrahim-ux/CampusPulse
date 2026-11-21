# Backend Phase 1 — account access and private cloud backup

## What is implemented

- Cookie-backed Supabase SSR clients for the browser and server.
- Next.js 15 middleware refreshes the Supabase Auth session on incoming requests.
- Optional email OTP sign-in and sign-out at the account page.
- A protected sync API at /api/sync that derives the user ID from the validated Supabase Auth user.
- Explicit RLS policies and least-privilege grants for profile, saved-scheme, reminder and document-checklist rows.
- An account page to back up local-first data to the signed-in account or restore an account snapshot to this browser.
- Local-first behavior remains available when Supabase environment variables are absent.

## Data stored in Supabase

| Data | Table | Notes |
|---|---|---|
| Student profile | profiles | Existing profile table; keyed by auth.users.id, with preferred_mode added by this migration |
| Saved schemes / tracker | saved_schemes | Stable catalogue scheme key, status, notes, next action, reminder date |
| Personal reminders | student_reminders | Title, date, kind and completion state |
| Document checklist | document_checklists | Checked document type IDs only |

The curated scholarship catalogue continues to be maintained in lib/scholarships.ts. This phase does not create a duplicate catalogue table.

Uploaded documents, document review files, rejection remarks and AI reports are not included in cloud sync. The API does not store those materials.

## Configure a CampusPulse Supabase project

Create or select a Supabase project specifically for CampusPulse. The Supabase project currently visible to the connected account is not a CampusPulse project and must not be reused for this app without an explicit decision.

Copy the Project URL and publishable key from the Supabase Project Connect dialog into .env.local:

    NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY

The legacy NEXT_PUBLIC_SUPABASE_ANON_KEY remains supported for existing development projects, but the publishable key is preferred. Never put a secret or service-role key in a NEXT_PUBLIC_ variable.

## Apply the database migration

Apply the repository migrations in order to a new project:

1. supabase/migrations/001_initial_schema.sql
2. supabase/migrations/20261122000000_campuspulse_user_data.sql

Use the Supabase CLI or SQL Editor. The second migration creates the cloud backup tables and explicit user ownership policies. Do not apply it to another product's Supabase project.

## Configure email OTP

Supabase email authentication must be enabled. The account page requests a six-digit email OTP; the Supabase Auth email template must include the {{ .Token }} variable (rather than only a confirmation URL). Use a verified sender/domain and tune OTP expiry and rate limits in Supabase Auth settings before production.

## Backup and restore behavior

- Backup writes the current browser profile and local data to the signed-in account.
- Records are upserted by the account + scheme/reminder ID.
- Existing cloud-only rows are not deleted during backup.
- Restore replaces this browser's profile, tracker, reminders and checklist state with the cloud snapshot.
- A restored profile and tracker emit the same browser events used by the existing workspace components.

This is an explicit user-driven backup/restore flow. It does not silently merge or overwrite local state at sign-in.

## Security model

- All private data tables have RLS enabled.
- Client-role privileges are revoked from anon; authenticated receives only the CRUD privileges needed by the app.
- Each policy is scoped to authenticated and checks auth.uid() against the row owner.
- The API derives the owner ID from the validated Auth user; it never accepts a user_id from the request payload.
- No service-role or secret key is used by the browser or sync API.
- No SECURITY DEFINER function or user-metadata-based authorization is introduced. The legacy public profile trigger is removed by this migration.

## Known limitations / next backend work

- A dedicated CampusPulse Supabase project has not yet been connected, so the migration has not been applied to a live database and OTP cannot be end-to-end tested yet.
- Local browser storage remains the primary store until the user backs it up from /account. The application modules are not yet continuously synchronized on every edit.
- Backup upserts rows; deletes in the browser are not propagated to cloud storage in this first phase.
- Add transactional sync / conflict resolution, server-side rate limiting for AI endpoints, admin roles and catalogue curation, private document storage (only if required), and end-to-end RLS tests in subsequent phases.
- Browser visual QA and live Supabase verification remain outstanding.
