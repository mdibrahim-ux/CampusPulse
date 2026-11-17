# CampusPulse manual acceptance checklist

## Scholarship-only scope
- [ ] Sidebar and landing page show only scholarship workflows.
- [ ] Old `/opportunities` and `/sources` routes redirect to `/scholarships`.
- [ ] Directory contains only scholarship schemes with source, rule version and caveats.

## Eligibility checker
- [ ] Fill current study level, course mode, income and relevant scheme fields.
- [ ] Tick the available documents and run the checker.
- [ ] Verify potential / more-information / no-match states, matched criteria, unknowns and missing documents.
- [ ] Clear the form and confirm answers are not persisted after refresh.
- [ ] Confirm missing documents are not treated as automatic ineligibility.

## Document review (requires server-side OpenAI API key)
- [ ] Without `OPENAI_API_KEY`, the route returns a clear setup message.
- [ ] Without consent, file upload is blocked by the route.
- [ ] Test a redacted PDF, JPG and PNG under 8 MB.
- [ ] Reject unsupported types and oversized files.
- [ ] Result identifies apparent type, use, visible fields, issues and limitations.
- [ ] Confirm the result never calls a certificate authentic / fake and masks visible identifiers.
- [ ] Confirm file does not appear in localStorage or Supabase.

## Rejection analyser (requires server-side OpenAI API key)
- [ ] Paste a defect remark and choose `Defected`.
- [ ] Paste a rejection remark and choose `Rejected`.
- [ ] Confirm the report explains difference; does not promise reversal or invent appeal rights.
- [ ] Confirm it requests removal of application IDs, OTR and personal numbers.

## Tracker / planner / quality
- [ ] Save and remove a scholarship; refresh and confirm persistence.
- [ ] Update progress, notes, next action and personal date.
- [ ] Create, complete and delete personal reminder.
- [ ] Test keyboard focus and mobile navigation.
- [ ] Test `prefers-reduced-motion`.
- [ ] Run `npm run lint`, `npm run typecheck`, `npm run build`.