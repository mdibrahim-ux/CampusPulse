# CampusPulse 2.0 — Product Plan

## Product position
CampusPulse is a student opportunity workspace for India. It does not replace scholarship or internship application portals. It helps students discover opportunities across fragmented official sources, understand fit and gaps, prepare documents, save opportunities, and manage the work that happens before and after applying.

## Research findings (checked 17 November 2026)
- National Scholarship Portal (NSP) exposes academic-year scheme catalogues, application windows, scheme guidelines/FAQs, eligibility checking, OTR sign-up, application status and PFMS payment tracking. Its 2026–27 catalogue includes explicit student, institute and officer timelines. Source: https://scholarships.gov.in/Students and https://scholarships.gov.in/All-Scholarships
- AICTE National Internship Portal supports student profiles, opportunity matching, filters/search by stream/location, and application flow on its own portal. Source: https://internship.aicte-india.org/
- UGC Student Corner lists fellowships, scholarships and student support portals including SWAYAM, Academic Bank of Credits, grievance support and fake-university alerts. Source: https://www.ugc.gov.in/Home/student_Corner
- SWAYAM Plus offers industry-aligned courses, partner opportunities, multilingual learning and academic credit recognition where applicable. Source: https://swayamplus.education.gov.in/
- National Career Service provides job search, job matching, job fairs, career content, mentoring and employability resources. Source: https://ncs.gov.in/

## Product principles
1. Never invent a student's name, college, GPA, profile completion, match count or deadline.
2. Separate confirmed official facts from user-maintained notes and sample/demo content.
3. Every opportunity must show source, last checked date, official link, status and confidence/provenance.
4. Never ask for Aadhaar, OTR, bank credentials, passwords or disability identity documents in CampusPulse.
5. Do not submit applications on behalf of students. Continue application on the official provider website.
6. Eligibility matching is an explainable checklist, not a guarantee or eligibility decision.
7. Persist a student's profile, saved items, tracker updates and document checklist locally in demo mode; support Supabase persistence when configured.

## Feature-by-feature implementation plan

### F01 — Product shell and onboarding
- Brand-led public landing page explaining the value proposition and data boundaries.
- Student onboarding with name (optional), education level, degree/stream, year, state/city, institution, skills and opportunity interests.
- No pre-filled fictional identity or assumed profile.
- Empty states and sample data opt-in rather than silently fabricated account metrics.

### F02 — Opportunity catalogue
- Categories: scholarships/fellowships, internships/apprenticeships, entry-level jobs, courses/certifications and events/competitions.
- Search; filters by category, location/work mode, source, deadline, paid/free, education level and verification status.
- Curated official provider directory with provider-specific routes.
- Demo listings clearly marked as examples. No generic provider entry falsely labelled as a live vacancy.

### F03 — Opportunity detail and matching
- Detail view with provider, description, location, award/stipend if known, window/deadline, eligibility requirements, required documents, source URL and last checked timestamp.
- Match breakdown: matched conditions, missing profile information, potential gaps and unknown conditions.
- Eligibility evidence is labelled 'appears to match', 'check details' or 'profile gap'; never 'guaranteed eligible'.

### F04 — Save and tracker
- Save/unsave opportunities.
- Student-controlled statuses: Interested, Preparing, Applied, Assessment, Interview, Offer, Not selected, Withdrawn.
- Notes, next action, application date and provider application URL.
- Dashboard metrics derived from actual saved records only.

### F05 — Document readiness
- Reusable document checklist templates (identity proof, income certificate, marksheets, bonafide/institute verification, bank proof, category/disability certificate only when provider requires).
- Checklist records status and note only; no sensitive files or identity numbers stored in MVP.
- Show that exact requirements must be checked in official scheme guidelines.

### F06 — Deadline planner and reminders
- Calendar/list view for deadlines entered or confirmed by student.
- Separate student reminder dates from provider closing dates.
- Timezone-aware dates, overdue and upcoming labels.
- Browser notifications are opt-in; no notification promise without permission.

### F07 — Source desk and trust layer
- Official-source directory for NSP, AICTE, UGC, SWAYAM Plus and NCS.
- Source type and last-checked timestamp.
- A listing may be 'Official page', 'Provider catalogue', 'Curated reference' or 'Demo sample'.
- Report stale listing action stores a local feedback note in demo mode.

### F08 — Settings, accessibility and responsive polish
- Edit profile/preferences; data reset/export in demo mode.
- Keyboard navigation, visible focus, reduced-motion preference and clear contrast.
- Tablet/mobile responsive navigation; animation is purposeful and restrained.

### F09 — Backend foundation
- Supabase schema for profiles, opportunities, saved opportunities, applications, checklist items and reminders.
- Row-level security by authenticated user.
- Demo/localStorage mode remains functional without credentials.
- Real auth and persistence activate only after Supabase environment variables and migrations are configured.

## Release order
P0: F01, F02, F03, F04, F05, F06, F07, F08 — complete local-first product.
P1: F09 — production backend integration with Supabase project credentials.
P2: Official-source ingestion adapters only after stable APIs/data terms are verified; otherwise curated source desk.

## Acceptance checklist
- A new student sees onboarding, not a fictional profile.
- Profile edits are retained after refresh.
- Search and filters materially change catalogue results.
- Each card opens a detail page.
- Match breakdown explains why it appears relevant and what is unknown.
- Save and tracker changes persist after refresh.
- Deadline and reminder entries are user-controlled and distinguish source deadlines.
- Demo listings are visibly labelled.
- External apply actions open official source domains.
- Mobile navigation, focus states and reduced motion work.
- npm run lint, npm run typecheck, and npm run build pass.