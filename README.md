# CampusPulse — Scholarship Intelligence

CampusPulse is an India-focused scholarship preparation workspace. It is intentionally limited to scholarships: scheme discovery, profile-and-document matching, document explanation, rejection/defect diagnosis, application tracking and personal reminders.

> CampusPulse is independent and is not a government portal. Its checker produces a preliminary rule comparison, not a decision or guarantee of eligibility. Scholarship applications and final decisions remain with the official provider.

## What is included

- **Scholarship directory:** named Central scholarship scheme references with source URL, scheme-rule version, current catalogue window note and caveats. No internship, job, course or event listings.
- **Eligibility checker:** a guided form that compares your study, income and scheme-specific answers against the published rule snapshots. Tick the documents you already have and see missing evidence per scheme. Results are `Potential match`, `Needs more information`, or `Not a match based on these answers`.
- **Document review:** optional PDF / JPG / PNG / WEBP review to identify what a document appears to be, explain its common scholarship use, list visible fields and flag visual quality / completeness issues. It cannot authenticate documents or certify that a portal will accept them.
- **Rejection analyser:** paste the exact portal remark and status. The report explains the remark, separates a defect from a rejection, suggests what to check, and prepares questions for the relevant institute / nodal officer. It never promises a rejected application can be reopened.
- **Scholarship tracker and reminders:** save a scheme, record progress and next action, and add your own follow-up reminders.
- **Local-first profile:** basic education profile, export and reset. Profile, tracker and reminders are stored in this browser only. The checker does not automatically save sensitive income/category/disability answers.

## Research sources checked 17 November 2026

- [National Scholarship Portal — Students](https://scholarships.gov.in/Students) and [All Scholarships](https://scholarships.gov.in/All-Scholarships): NSP shows AY 2026–27 and lists individual scheme specifications, FAQs and student / verification timelines. The NSP page notes OTR is mandatory.
- [NSP Scholarship Eligibility Checker](https://scholarships.gov.in/scholarshipEligibility/): official scheme eligibility checker. CampusPulse is a complementary checklist and explanation tool, not a replacement.
- [PM-USP CSSS FAQ 2025–26](https://www.education.gov.in/sites/upload_files/mhrd/files/upload_document/FAQs_PM_USP2526.pdf): fresh-applicant criteria include above 80th percentile in the relevant Class XII stream, regular course, family income up to ₹4.5 lakh, no other scholarship / fee reimbursement, and no post-Class-XII drop. Confirm newer-year rules.
- [AICTE Pragati / Saksham brochure](https://aicte-qa.aicte-india.org/sites/default/files/pragatisaksham.pdf): older scheme brochure with criteria and document examples. The current NSP specification is the source to follow if it differs.
- [Top Class Scholarship for SC Students guidelines](https://socialjustice.gov.in/writereaddata/UploadFile/95131767944207.pdf): guidelines applicable from 2025–26; the scheme is for SC students with family income up to ₹8 lakh and admission to prescribed full-time programmes at notified institutions. Verify the current notified list.
- [DEPwD Post-Matric Scholarship](https://depwd.gov.in/en/scholarship-post-matric/): official programme page with current published overview for students with benchmark disabilities.
- [NSP Standard Operating Procedures](https://scholarships.gov.in/public/FAQ/NSP_SOP.pdf): distinguishes defective applications returned for correction and reverification from rejected applications. Scheme-specific and current portal instructions still control.

The scheme reference set is not the full NSP catalogue and is not a live data feed. CampusPulse does not scrape or submit applications. Dates and conditions change; use linked official pages before relying on a rule.

## Run locally

Requirements: Node.js 20.9+ (Node 22 recommended), npm 10+.

```powershell
git clone https://github.com/mdibrahim-ux/CampusPulse.git
cd CampusPulse
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000. The directory, checker, tracker and reminder planner work without an API key.

## Enable document and rejection analysis

1. Create an API key in the OpenAI API platform. A ChatGPT subscription is not an API key. API usage is billed separately.
2. Put the key only in `.env.local` (never commit it):

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1
```

3. Restart `npm run dev`. The document and rejection analysis endpoints use the server-side Responses API with `store: false`. Requests are sent to the AI provider for processing; review the provider's current API data policy and cost before use. CampusPulse does not save uploaded files in its database or localStorage.

### Sensitive-document warning

Redact Aadhaar numbers, NSP OTR, bank account / IFSC, phone numbers, full addresses and QR/barcode payloads before upload. Do not upload an unredacted Aadhaar card, passbook or bank statement. The reviewer masks identifiers in its answer but cannot remove information already sent in the uploaded file. Only upload a document when you are comfortable sending it to the configured AI provider.

The review can explain visible content and quality issues; it cannot authenticate a certificate, verify an issuer's database, validate a QR code, determine fraud, or guarantee acceptance. For a correction, obtain a reissued document from the issuing authority—never alter an official certificate yourself.

## Quality checks

```powershell
npm run lint
npm run typecheck
npm run build
```

## Architecture and limitations

- Next.js App Router, TypeScript, React and server route handlers.
- Scholarship rules and document checklists are versioned in `lib/scholarships.ts`; rule comparison is deterministic and explainable.
- AI analysis lives in `app/api/analyze-document` and `app/api/analyze-rejection`; the API key is accessed only server-side.
- Local profile, saved schemes and reminders use browser `localStorage`. No documents are stored.
- `supabase/migrations/001_initial_schema.sql` remains a backend foundation only; authenticated persistence is not switched on by this local-first release.

## Privacy and safety

Do not enter portal passwords, OTPs, Aadhaar or OTR numbers, bank-account numbers or other unnecessary identity data. Income, category and disability are sensitive; the checker uses them only for the in-session rule comparison and does not persist them by default. This is a privacy-conscious design, not a legal compliance certification.

## License

MIT — see [`LICENSE`](LICENSE).

## Interface notes

The scholarship workspace uses a responsive top navigation with capsule-style links; the left sidebar has been removed. The landing page uses real university-hosted student-life photography (Vidya University Library and St Joseph's University) with visible photo attribution. Images are loaded from the source institutions' public image URLs; if a host changes its image path, replace the URL in `app/page.tsx`.