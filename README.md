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