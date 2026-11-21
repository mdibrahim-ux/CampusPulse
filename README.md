# CampusPulse — Student Support & Scholarship Workspace

CampusPulse helps students discover scholarships, compare preliminary eligibility, prepare documents, understand application defects/rejections, find official support offices, and discover practical student services.

## Main modules

- **Overview:** scholarship deadlines closing soon (source snapshot), saved schemes, personal reminders and student-service shortcuts.
- **Scholarship directory:** named scholarship references with current source/date notes, criteria and official links.
- **Eligibility checker:** guided rules comparison and tickable document checklist. Results are preliminary, not official decisions.
- **Document intelligence:** consent-gated review of one redacted PDF/image. It describes apparent document type/purpose and visible quality issues; it cannot authenticate a certificate.
- **Rejection analyser:** interprets the exact portal remark and separates defective/returned applications from rejected applications. It never promises a rejection can be reversed.
- **Student services:** Karnataka student bus-pass guidance, DigiLocker, ABC/APAAR, PM-Vidyalaxmi and student education-plan tools such as GitHub, Azure, JetBrains, Figma, Autodesk, Notion, Microsoft and Google education services.
- **Scholarship office finder:** city/district map search plus official NSP scheme-wise and district-wise nodal officer links. Public officer names appear only when an official directory publishes them.
- **Tracker and planner:** local saved schemes, next actions and personal reminders.

> CampusPulse is an independent guide, not a government portal. Scholarship eligibility, deadlines, service routes and software benefits are controlled by their respective providers. A college email alone does not guarantee every education offer.

## Run locally

Requirements: Node.js 20.9+ (Node 22 recommended), npm 10+.

```powershell
git clone https://github.com/mdibrahim-ux/CampusPulse.git
cd CampusPulse
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. The root route opens the overview dashboard.

## AI analysis configuration

Create an OpenAI API key, then place it only in `.env.local`:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1
```

Restart `npm run dev`. API usage is billed separately from ChatGPT subscriptions. Uploaded documents and rejection text are sent to the configured AI provider for analysis. Redact Aadhaar, NSP OTR, bank details, phone numbers, full addresses and QR/barcodes before uploading. CampusPulse does not persist uploaded documents.

## Quality checks

```powershell
npm run lint
npm run typecheck
npm run build
```

## Source and deadline policy

Research notes are in `docs/RESEARCH.md`. The overview's near-deadline cards are dated source snapshots from NSP AY 2026–27, checked 17 November 2026; they are not a live feed. Check the official scheme page before applying.

## Local storage and privacy

Profile, tracker and reminders use browser `localStorage`. The local-first build does not synchronise data across devices. Do not enter portal passwords, OTPs, Aadhaar/OTR numbers, bank account numbers or other unnecessary identity data.

## Office and officer information

The office finder performs a map search using the city and department relevant to the selected scheme. NSP's official scheme-wise/district-wise officer directories remain the source of truth. CampusPulse will not guess names, locations or contact details when the authority has not published them.

## Backend roadmap

The Supabase migration remains a foundation. Hosted authentication, cross-device persistence, admin data curation and automated live source ingestion are not represented as complete in this release.

## License

MIT — see [`LICENSE`](LICENSE).

## System-wide Indian language support

CampusPulse includes a global language selector with 23 language options: English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Odia, Urdu, Assamese, Sanskrit, Konkani, Kashmiri, Maithili, Nepali, Sindhi, Bodo, Dogri, Manipuri and Santali.

The language preference is saved in this browser and applies across the app. Page text, headings, navigation, buttons, form labels, placeholders and accessibility labels are translated. User-entered values and uploaded-document analysis content are not run through the page translator; document and rejection reports are requested directly in the selected language.

### Enable translation

Translation has two provider options. The easiest option is the OpenAI key already used by document/rejection analysis: when `OPENAI_API_KEY` is present, CampusPulse can translate the interface without separate BHASHINI credentials. BHASHINI is preferred when its keys are configured.

1. For BHASHINI, register at https://bhashini.gov.in/ and create a project/API key in the ULCA profile.
2. Add the values to `.env.local` (server-side only) when using BHASHINI:

```env
BHASHINI_USER_ID=your_ulca_user_id
BHASHINI_ULCA_API_KEY=your_ulca_api_key
BHASHINI_PIPELINE_ID=64392f96daac500b55c543cd
```

3. Restart Next.js. Choose a language from the globe selector in the top bar.

OpenAI fallback: set `OPENAI_API_KEY` and `OPENAI_MODEL` (the same key used for document/rejection analysis). Interface text batches are sent to the OpenAI Responses API with storage disabled, and returned translations are cached in the browser. BHASHINI remains preferred when configured. If neither provider is configured, CampusPulse keeps the page in English and shows a small status icon; hover it for setup details. It never displays a false “translated” state. Bhashini availability, model quality, usage limits and charges are controlled by the selected project and current service terms.

## Automatic NSP officer-source monitoring

A GitHub Actions workflow checks the official NSP Officers and Public pages every day at 09:00 India time and updates `public/data/officer-source-status.json` with page availability and the portal's own “Last update” marker.

The workflow does **not** scrape officer names, emails or phone numbers. NSP's scheme-wise and district-wise officer pages are interactive filtered forms and may require CAPTCHA. Students open the official live form, choose their scheme or district, and complete the portal's checks to see the currently assigned officer. CampusPulse's map is a department/location search, not a government-maintained office register.

Manual refresh: GitHub → Actions → “Refresh official scholarship officer sources” → Run workflow.


## Full UI/UX redesign — Editorial Neo-Brutalism

The current visual system is a dark neo-brutalist workspace built from Midnight Ink, Electric Cobalt, Signal Coral, Scholar Amber and warm off-white typography. It uses a single-row capsule navigation, filled pill actions, circular icon holders, crisp hard-offset shadows and responsive layouts. No green is used as a brand or action colour.

The overview now has a focused editorial hero, a short deadline strip, three student task paths, saved scholarships and a student-services panel. The scholarship directory has a searchable/filterable layout and scheme/provider imagery.

### Scholarship image provenance

Each scholarship card identifies its image as scheme artwork or an issuing-authority logo. Images are not recoloured or presented as a unique scheme logo when the source only represents the provider:
- PM-USP CSSS: Ministry of Education identity asset from SATHEE / IIT Kanpur.
- AICTE Pragati: published scheme artwork.
- AICTE Saksham: published scheme poster.
- Top Class SC: Government of India National Emblem from the UX4G approved logo library.
- DEPwD Post-Matric: official DEPwD scholarship-scheme artwork.

The official scheme source links remain the authority for current rules and application dates. The full design rationale is in `docs/DESIGN-REDESIGN-PLAN.md`.


## Dark product redesign

The current experience is a dark editorial neo-brutalist workspace with an opaque capsule navigation layer. The content surfaces remain opaque for legibility. The overview contains an interactive explanation of the three actual product stages (student details, scholarship rule comparison and preparation actions), a deadline module sourced from explicit student-deadline fields, and a category chart computed from the five curated scheme records in `lib/scholarships.ts`. The category chart is not a national distribution or user-outcome metric.

The current design research, palette, layout choices and acceptance criteria are recorded in `docs/DARK-BRUTALIST-LANDING-PLAN.md`.
