# CampusPulse architecture

## Application

- Next.js App Router + TypeScript + React.
- Scholarship-only routes: landing, dashboard, scholarship directory and detail, eligibility checker, document review, rejection analyser, saved scholarship tracker, personal planner and academic profile. Legacy `/opportunities` and `/sources` URLs redirect to `/scholarships`.
- Neo-brutalist visual system based on warm paper background, acid-lime panels, lilac / peach accents, heavy ink borders and short motion transitions. `prefers-reduced-motion` is respected.

## Domain logic

- `lib/scholarships.ts` contains scheme metadata, rule snapshots, required document IDs and a deterministic condition evaluator. Match state is calculated from user answers: potential match / needs more information / not a match. Documents missing are shown separately from eligibility conflicts.
- `app/eligibility-checker` keeps answers in component memory only; it does not persist income, category or disability inputs in localStorage.
- `lib/data.ts` and the tracker provide the scholarship reference records; all records are scholarship type.

## AI routes

- `POST /api/analyze-document`: multipart file, one PDF or supported image, <=8 MB, explicit consent, optional intended use. File is converted to base64 in memory and passed to Responses API. No database / localStorage write.
- `POST /api/analyze-rejection`: text-only portal reason, scheme, stage and status. Prompt distinguishes defected from rejected and forbids invented appeal paths or reversal guarantees.
- `lib/openai-response.ts` keeps API key server-side, calls Responses API with `store: false` and extracts output text. Set `OPENAI_API_KEY` in `.env.local`; `OPENAI_MODEL` defaults to `gpt-4.1`.
- User-provided files / reasons are still sent to the configured AI provider for analysis. UI requires explicit consent and warns users to redact Aadhaar, OTR, bank and unrelated personal identifiers. `store: false` is not a promise of zero provider-side processing / retention.

## Storage

- Profile, tracker and reminders use browser localStorage.
- Checker answers are not persisted by default.
- Uploaded documents are not saved by CampusPulse.
- Supabase migration is a starting schema only; authentication, server-side persistence and production admin ingestion are not enabled by this release.

## Security notes

- Never place `OPENAI_API_KEY` or Supabase service-role keys in `NEXT_PUBLIC_*` variables.
- Keep identity numbers and application credentials out of client forms.
- AI responses are preliminary guidance; never present them as an authentic-document verdict, official eligibility decision, or guarantee of appeal success.