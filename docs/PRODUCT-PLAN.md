# CampusPulse — product plan, November 2026

## Product position
CampusPulse is a student support workspace for India. Scholarships remain a primary module, alongside practical student services: transit concessions, academic records, education finance, and verified education-plan benefits for software and cloud tools.

## Feature-by-feature plan

### F01 — Overview without a marketing landing page
- Visiting `/` takes the student directly to the overview dashboard.
- Overview shows saved scholarship activity, personal reminders, verified scholarship deadlines within 30 days, and an entry point to the Student Services directory.
- Deadline cards display source-check dates and distinguish the student application deadline from later institute/department verification dates.

### F02 — Scholarship catalogue and detail
- Keep scholarship-only discovery.
- On scholarship detail, add local support discovery based on the scheme's responsible department and the student's selected city/district.
- Show a city map search and public office information only when a government source publishes it.
- Link directly to NSP scheme-wise nodal officers and district-wise nodal officers/grievance services.

### F03 — Student Services directory
- Transport: Karnataka KSRTC student pass route through Seva Sindhu; clarify that KSRTC pass rules are not automatically BMTC city-bus rules.
- Academic records: DigiLocker and Academic Bank of Credits / APAAR.
- Education finance: PM-Vidyalaxmi loan application/status/grievance links.
- Education-plan tools: GitHub Student Developer Pack, Microsoft Azure for Students, JetBrains, Figma Education, Autodesk Education, Notion Education, Microsoft 365 Education, Google Workspace for Education, AWS Educate.
- Include a clear “who qualifies” and “what proof is required” explanation per service. Do not promise that any arbitrary college email domain automatically qualifies.
- Include cautions where a frequently shared student offer does not apply to university students (Canva Education is currently K–12 focused).

### F04 — Scholarship local office / officer finder
- Scheme-to-department mapping: SC/social welfare, disability welfare, AICTE, minority welfare, higher education or general district scholarship nodal channel.
- City, district and state inputs drive a map search.
- The official NSP scheme-wise/district-wise directory is the source of truth for assigned officers and grievance officers.
- A named officer is displayed only when a government directory publishes the role/contact. General District Commissioner contacts must never be labelled as the scholarship's assigned officer.
- Map pins/search results are third-party geospatial information and must be independently checked before visiting.

### F05 — Visual system
- Replace the acid-lime/lilac/peach palette with ink navy, peacock teal, warm amber, mineral blue and soft neutral surfaces.
- Keep the neo-brutalist border/shadow language and pill navigation.

### F06 — Existing scholarship intelligence retained
- Tickable document inventory and explainable eligibility comparison.
- Consent-gated document review and rejection/defect analysis.
- Scholarship tracker and personal reminder planner.
- Local-first storage and server-side AI API key only.

## Acceptance checks
1. `/` redirects to `/dashboard`; no marketing landing page is rendered.
2. Dashboard shows the student application deadlines in the next 30 days from the dated source snapshot, with official source link.
3. Student Services filters and search work and every card has eligibility/verification notes and an official provider URL.
4. Bus-pass card is explicitly KSRTC/Seva Sindhu for the current 2026–27 process and does not imply universal BMTC validity.
5. Scholarship detail map search responds to city/district/state inputs and includes official NSP officer directory links.
6. No officer name or number is fabricated; general district contacts are labelled as non-scheme-specific.
7. New palette is consistent across overview, services and scheme detail pages.
8. Existing eligibility, document analysis, rejection analysis, tracker and planner remain accessible.

### F07 — System-wide language
- Global language selector persisted in browser localStorage and reflected in the root HTML lang/dir attributes.
- Translate visible UI text, navigation, headings, buttons, form labels, placeholders and accessible labels on every route.
- Preserve user-entered text and uploaded-document outputs from page-wide DOM translation. AI document/rejection reports are requested in the selected language.
- 23 language choices, using BHASHINI's translation pipeline where the configured project supports the requested language pair.
- Missing API credentials or unsupported language pair must be reported honestly; do not claim a language is active when translation has not run.

### F08 — Official officer-source freshness
- A daily GitHub Actions job checks NSP Officers, Public, scheme-wise and district-wise directory page availability.
- Capture the portal's own last-updated marker and checked timestamp in a versioned public JSON snapshot.
- Never bypass CAPTCHA or scrape officer names, phone numbers or emails from protected forms.
- Scheme-wise and district-wise results remain live on official NSP forms; CampusPulse supplies direct links, map search and source-freshness metadata.

### Additional acceptance checks
9. Language choice persists across refresh and all app routes.
10. Every visible static string is translated through the configured Bhashini pipeline; user-entered values and document analysis outputs are excluded from page-wide translation.
11. Urdu and other RTL languages set document direction appropriately.
12. Missing Bhashini credentials produce a visible setup status and keep English text legible.
13. Officer-source status is refreshed daily by GitHub Actions and shows both checked time and the portal's own published update marker.
14. Officer names/contact details are never fabricated or collected by bypassing NSP's CAPTCHA.
