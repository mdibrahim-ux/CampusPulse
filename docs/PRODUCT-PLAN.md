# CampusPulse Scholarship Intelligence — Feature Plan

Research checked 17 November 2026. The user-approved scope is scholarship-only. Internships, jobs, courses and events are removed from the product.

## Product promise

Help a student answer four practical questions: (1) which scholarships may fit the details they provide; (2) which documents do they already have and what is missing; (3) what does a document appear to be and what visible issues need attention; (4) what does a portal defect / rejection reason mean and what is the next safe step? CampusPulse never submits an application or decides an award.

## Research and data provenance

- NSP Students and All-Scholarships pages show AY 2026–27, named scheme listings, individual specifications / FAQs and separate student and verification timelines. NSP states OTR is mandatory. https://scholarships.gov.in/Students and https://scholarships.gov.in/All-Scholarships
- NSP has its own eligibility checker. CampusPulse complements this with a document tick list and human-readable explanation; it does not replace the official checker. https://scholarships.gov.in/scholarshipEligibility/
- PM-USP CSSS FAQ 2025–26: above 80th percentile of successful Class XII candidates in the relevant board stream; regular study; family income ≤₹4.5L; no other scholarship / fee reimbursement; fresh applicants taking a post-Class-XII drop are excluded. Source: Ministry of Education FAQ.
- AICTE Pragati / Saksham scheme brochure contains an older set of criteria and example documents. The current NSP scheme specification and FAQ must override the historical snapshot.
- Top Class Scholarship for SC Students guidelines applicable from 2025–26 require SC category, annual family income ≤₹8L, full-time prescribed course and institution on the notified list; institution-wise scholarship slots apply. Confirm the current notified list.
- DEPwD Post-Matric scheme page identifies eligible course levels, benchmark disability and income requirements; check current official scheme guidelines for exact document format.
- NSP SOP: an application marked defective is returned to the student for correction and then enters reverification. Rejected is a distinct status; CampusPulse must not promise editing / resubmission will reverse it. https://scholarships.gov.in/public/FAQ/NSP_SOP.pdf

## F01 — Scholarship catalogue

- Only scholarship schemes and scholarship sources appear in navigation or catalogues.
- Each scheme card has provider, source, rule snapshot date, amount wording where supported, deadline / status note and caveats.
- Catalogue references are not presented as a live scraped feed.

## F02 — Document possession checklist + eligibility engine

- Ask study level, mode, technical / AICTE status, admission year, Class XII percentile band, family income band/value, category, gender only for a scheme that needs it, girl children count for Pragati, disability percentage only if relevant, institution list status and other scholarship receipt.
- Ask which documents the student currently has using tickable checklist controls.
- Compare each scheme condition by condition and report `Potential match`, `Needs more information` or `Not a match based on these answers`.
- Show matched rules, failing conditions, unknown fields and missing documents per scheme.
- Missing documents do not automatically mean a student is ineligible.
- Sensitive answers stay in component memory and are not persisted to localStorage by this release.

## F03 — Document Intelligence

- Accept one PDF / JPG / JPEG / PNG / WEBP at a time, maximum 8 MB.
- Require explicit consent before sending; explain that the file is relayed from the server to the configured OpenAI API.
- Send Responses API request with `store: false`; no file is saved in CampusPulse database or localStorage. Provider-side processing / API data policy still applies.
- Identify the apparent document with confidence and evidence; explain common scholarship purpose; list visible non-sensitive fields; detect only visible quality / completeness concerns such as crop, blur, glare, unreadable text, missing edge/page, visibly expired date or apparent mismatch.
- Never call a document authentic / fake, never repeat full identifiers, never recommend editing / backdating official documents. For a true error, instruct user to request a corrected reissue from the issuer.

## F04 — Rejection / defect analyser

- Collect scheme name, exact portal status, verification stage and exact reason text. Warn users to remove application ID, OTR, Aadhaar and other personal identifiers.
- Translate the remark, classify likely issue, separate known fact from possibility, list corrective actions, tell user what must be obtained from the issuer and prepare questions for the institute / nodal officer.
- Make the defected vs rejected distinction explicit. Do not promise a rejected application can be reopened or that an appeal exists without scheme-specific evidence.

## F05 — Saved scholarship tracker and planner

- Track Interested, Preparing, Applied, Under verification, Defected, Rejected, Approved, Awarded or Withdrawn.
- Store notes / next action / personal reminder locally. Distinguish personal reminders from official provider closing dates.

## F06 — Source desk and trust signals

- NSP, AICTE scholarship source, Ministry of Social Justice, DEPwD and scheme-specific official pages.
- Every scheme references the exact guideline version and date checked. Old guideline snapshots are labelled as such.
- Keep official provider links visible; all deadlines and document formats must be rechecked before applying.

## F07 — Privacy and security boundaries

- Never ask for portal password, OTP, Aadhaar number, OTR number, bank account number or IFSC.
- Explicit upload consent and sensitive identifier redaction notice.
- File bytes are streamed to the AI provider only during the request; no storage in CampusPulse.
- Keep API key server-side only. No key in client bundle, browser storage or GitHub.
- Local profile export / reset; sensitive eligibility facts are not saved by default.

## Release acceptance checks

1. No internship, job, course or event appears in navigation or discovery.
2. Every catalogue entry is a scholarship scheme and has a source and rule-version note.
3. Eligibility result explains matched rules, conflicts, unknown answers and missing documents for each scheme.
4. Checker never labels a potential match as guaranteed eligible.
5. Document upload is consent-gated and limited by type and size; missing API key returns clear setup instructions.
6. Document report never certifies authenticity and masks identifiers in generated text.
7. Rejection analysis distinguishes defected from rejected and gives non-guaranteed next steps.
8. Local tracker and reminders persist through refresh.
9. Responsive layout, keyboard controls and reduced motion remain functional.