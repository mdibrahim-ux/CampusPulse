# Scholarship research notes

**Checked: 17 November 2026.** This is a curated rule reference, not a live feed or legal opinion. Where the underlying rule document predates the current academic year, the product marks that date and instructs students to verify the current NSP specification.

## Official sources

| Source | What the source currently provides | CampusPulse use |
|---|---|---|
| National Scholarship Portal Students: https://scholarships.gov.in/Students | AY 2026–27 portal, announcements, scheme listing, eligibility, OTR, application and payment tracking | Main starting point for official scholarship discovery. NSP says OTR is mandatory; do not capture the OTR or login in CampusPulse. |
| NSP All Scholarships: https://scholarships.gov.in/All-Scholarships | Named schemes, specifications, FAQs and distinct application / verification windows | Scheme catalogue metadata and source links. At 17 Nov 2026, many 2026–27 student deadlines displayed were 31 Oct 2026; distinguish student deadlines from later verification dates. |
| NSP Eligibility Checker: https://scholarships.gov.in/scholarshipEligibility/ | Official eligibility workflow asks students to provide facts and shows scheme results / reasons | CampusPulse adds a documents-in-possession checklist and readable rule comparison, not a replacement for NSP. |
| PM-USP CSSS FAQ 2025–26: https://www.education.gov.in/sites/upload_files/mhrd/files/upload_document/FAQs_PM_USP2526.pdf | Fresh eligibility includes >80th percentile in relevant Class XII stream, regular course, family income ≤₹4.5 lakh, no other scholarship / reimbursement, no Class XII drop for fresh application | Deterministic conditions in checker; 2025–26 snapshot is clearly labelled. |
| AICTE Pragati brochure: https://aicte-qa.aicte-india.org/sites/default/files/pragatisaksham.pdf | Older brochure states first-year AICTE-approved technical course, up to two girl children in family, income ≤₹8 lakh and example documents | Historical comparison only. Use current NSP degree-specific specification / FAQ if it differs. |
| AICTE Saksham current catalogue listing: https://scholarships.gov.in/All-Scholarships | 2026–27 NSP listing includes technical diploma and technical degree schemes | Current catalogue presence; detailed degree-specific criteria are not inferred beyond the referenced guideline snapshot. |
| Top Class Scholarship for SC Students guidelines: https://socialjustice.gov.in/writereaddata/UploadFile/95131767944207.pdf | Guideline applicable from 2025–26; SC status, family income up to ₹8 lakh, full-time prescribed course at notified institutions; slots allocated by institution | Checker requests institution-list status and warns about current institution list / slot validation. |
| DEPwD Post-Matric Scholarship: https://depwd.gov.in/en/scholarship-post-matric/ | Official scheme summary for Class XI/XII, Diploma, Degree and PG students; Indian national; benchmark disability ≥40%; family income ≤₹2.5 lakh; UDID; no other scholarship / stipend | Optional disability matching. Do not ask for disability certificate number or Aadhaar number. |
| NSP Standard Operating Procedures: https://scholarships.gov.in/public/FAQ/NSP_SOP.pdf | Institute nodal officer may verify, reject or defect; reasons should be supplied. Defected application is returned to student and reappears in reverification after resubmission. “Mark as Fake” also exists. | Rejection analyser must distinguish statuses and not promise a rejected application can be reopened. |

## Rule-source limitations

- Scheme rules may change between academic years and scheme versions. CampusPulse labels the date/version used and provides official source links.
- The NSP catalogue currently lists schemes with different student application and verification dates. A verification deadline after a student application deadline does not mean fresh applications remain open.
- The checker does not model every state, board, income-certificate format, institution list, course mapping, reservation, slot availability, renewal, or exception. Unknowns are surfaced rather than guessed.
- AICTE Pragati / Saksham brochures are older scheme snapshots. The current NSP specification is authoritative if rules were updated.
- No real-time API integration / scraping is claimed.

## AI document review integration

The current app uses OpenAI Responses API file inputs for PDF and image review. PDF input supports `input_file` with base64 `file_data`; PDF processing can include extracted text and rendered page images. Images can be sent as `input_image` with a base64 data URL and `detail: high`. References: https://developers.openai.com/api/docs/guides/file-inputs and https://developers.openai.com/api/docs/guides/images-vision. The app sends `store: false`, but does not claim the external API has zero retention; review provider policies before uploading sensitive files.

## Privacy design

Eligibility answers are in-memory only for this release. Document upload requires consent and is relayed through a server route; CampusPulse does not write the uploaded bytes to storage. Users are asked to redact unnecessary identifiers. The DPDP Rules, 2025 Gazette includes staged commencement and notice requirements; product privacy copy is designed to be explicit about the data sent and purpose, but this implementation is not a legal compliance certification. Gazette: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf