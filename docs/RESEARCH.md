# CampusPulse product research

**Checked: 17 November 2026**

## What exists already

| Provider | Existing student-facing capability | CampusPulse role |
|---|---|---|
| National Scholarship Portal | Academic-year scheme catalogue; scheme specifications and FAQs; eligibility checker; OTR registration; application status and PFMS payment tracking; separate student/institute/verification dates | Cross-source discovery, student-controlled preparation checklist, and reminders that distinguish student closing dates from verification milestones |
| AICTE National Internship Portal | Student profile; internship matching; filters by stream and location; opportunity/application flow on its own portal | Save useful programme references, record progress and explain what profile information is missing |
| UGC Student Corner | Lists fellowships, scholarships and higher-education/student-support resources | Make fellowships and adjacent student resources discoverable beside scholarships |
| SWAYAM Plus | Industry-aligned courses, multilingual learning and academic-credit recognition where applicable | Include skill-building and credit pathways in the same planning workspace |
| National Career Service | Job search, matching, job fairs, career content and mentoring resources | Include employment discovery without mixing it up with internships or scholarships |
| Skill India Digital Hub | Skills courses, centres, job exchange, apprenticeship and entrepreneurship opportunities | Give students a path from learning to work-based experience |

## Product gap / differentiation

The opportunity is not to recreate each portal's application system. The product gap is between portals: a student has to remember which programme was interesting, compare their own details with the listed requirements, gather supporting documents, note which website owns the application, record progress and remember the next step. CampusPulse can provide that cross-provider working surface while leaving application submission and sensitive identity data with the source provider.

## Data and trust constraints

- Public pages are not a promise of a stable machine-readable API. Do not scrape at scale or claim a live feed without confirming official API availability and terms.
- A provider portal or catalogue link is not a live vacancy record. Catalogue references are classified as such in the app.
- Store the date when the team last checked a provider reference. This is not an automatic freshness guarantee.
- Programme-level closing dates, award amounts, eligibility rules and documents must be confirmed against the exact scheme or role.
- The NSP portal has distinct student, institute and nodal verification timelines. These should not be collapsed into a generic "deadline".
- Eligibility matching is an explainable comparison based on user-entered profile information and available fields. It must show unknown conditions and never guarantee eligibility.
- Do not collect Aadhaar/OTR numbers, bank credentials, provider passwords, OTPs or sensitive document images.

## Official links

- https://scholarships.gov.in/Students
- https://scholarships.gov.in/All-Scholarships
- https://scholarships.gov.in/scholarshipEligibility/
- https://internship.aicte-india.org/
- https://www.ugc.gov.in/Home/student_Corner
- https://swayamplus.education.gov.in/
- https://www.ncs.gov.in/
- https://www.skillindiadigital.gov.in/

## Release boundary

The current implementation is a local-first MVP. It does not claim official data ingestion, live API synchronisation, hosted auth, multi-device sync, email/push notifications, admin moderation or application submission. Those belong to later releases after API access, provider permissions and backend security are verified.