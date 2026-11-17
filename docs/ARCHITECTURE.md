# Architecture

## Local-first MVP
- Next.js App Router, React and TypeScript.
- Framer Motion for short, purposeful transitions; Lucide for icons.
- `lib/data.ts`: curated provider catalogue references, not a live-feed cache.
- `lib/matching.ts`: deterministic matching explanation; missing/unknown profile fields remain visible.
- `lib/storage.ts`: browser localStorage adapter for profile, tracker and reminders.
- Routes: public landing, onboarding, dashboard, catalogue, opportunity detail, tracker, planner, sources and profile settings.
- `supabase/migrations/001_initial_schema.sql`: future hosted schema foundation only. Frontend does not currently authenticate or persist through Supabase.

## Data flow
1. Student enters optional profile fields through onboarding/profile.
2. Profile is stored in localStorage.
3. Catalogue cards call `matchOpportunity` using actual profile data.
4. Saving a provider reference creates a tracker record.
5. Tracker changes persist status, notes, next action and personal follow-up date.
6. Planner stores reminders entered by the student.

## Boundaries
- No automated source scraper/API ingestion in this release.
- Official provider links open in a new tab; final application remains on the provider.
- No sensitive identity records or document binaries are stored.
- LocalStorage is not authentication and is unsuitable for confidential shared-device data.
- Hosted mode requires Supabase auth, server-side authorization, tested RLS, secret handling, retention and account deletion controls.