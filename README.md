# CampusPulse 2.0

**Find your next move.** CampusPulse is an India-focused student opportunity workspace: discover provider catalogues, understand profile fit and gaps, save sources, track your own application progress, and plan personal follow-ups.

> CampusPulse is independent and is not a government portal. It does not submit applications, decide official eligibility, or collect Aadhaar, OTR, bank credentials, passwords or OTPs. Official providers remain the source of truth.

## Product scope

The researched, feature-by-feature scope and acceptance criteria are in [`docs/PRODUCT-PLAN.md`](docs/PRODUCT-PLAN.md). The implementation is local-first and works without a backend:

- First-run profile setup with education, programme, year, city/state, skills and interests.
- Dashboard based on real profile, saved tracker records and personal reminders. No fake student identity or fabricated metrics.
- Searchable source catalogue for scholarships/fellowships, internships, jobs, courses and career services.
- Opportunity detail pages with source class, last-checked date, provider status, eligibility notes and official outbound link.
- Explainable profile matching showing alignment, possible gaps and unknown conditions. It is not an eligibility decision.
- Save/remove provider references and track progress, next actions, notes and personal reminder dates.
- Deadline planner for user-created reminders. Provider deadlines are never silently copied into the personal calendar.
- Source directory, local data export/reset, responsive layouts, keyboard focus and reduced-motion support.

## Research sources

Research checked 17 November 2026. These are provider references, not API-backed live inventory:

- [National Scholarship Portal](https://scholarships.gov.in/Students) and [scheme catalogue](https://scholarships.gov.in/All-Scholarships): academic-year schemes, eligibility checker, scheme guidelines, separate student and verification timelines, OTR, application status and payment tracking.
- [AICTE National Internship Portal](https://internship.aicte-india.org/): student profile, internship discovery, discipline/location filters and provider-side application workflow.
- [UGC Student Corner](https://www.ugc.gov.in/Home/student_Corner): fellowships, scholarships and student support portals.
- [SWAYAM Plus](https://swayamplus.education.gov.in/): industry courses, multilingual learning and academic-credit recognition where applicable.
- [National Career Service](https://www.ncs.gov.in/): job search, job fairs, career information, mentoring and related services.
- [Skill India Digital Hub](https://www.skillindiadigital.gov.in/): skill courses, centres, job exchange and apprenticeship pathways.

No scraping or automated ingestion is claimed. Official links, not CampusPulse, supply current availability and detailed programme rules.

## Requirements

- Node.js 20.9+ (Node 22 recommended)
- npm 10+

## Run locally

```bash
git clone https://github.com/mdibrahim-ux/CampusPulse.git
cd CampusPulse
npm install
npm run dev
```

Open http://localhost:3000. First run begins at onboarding; the dashboard is available from the workspace shell.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Local data and privacy

Profile, tracker and reminder records use browser `localStorage`. They remain on that browser and are not synchronised to another device. The profile page provides JSON export and a clear-local-data action. Never store identity document scans, Aadhaar/OTR numbers, bank details, provider passwords or OTPs here.

## Backend roadmap

The initial Supabase migration remains in `supabase/migrations/001_initial_schema.sql` as a backend foundation. Authentication, authenticated reads/writes, admin curation and production ingestion are not represented as complete. Do not add a Supabase service-role key to browser variables. Before enabling hosted persistence, implement and test server-side authorization, RLS, data retention and account deletion.

## License

MIT — see [`LICENSE`](LICENSE).