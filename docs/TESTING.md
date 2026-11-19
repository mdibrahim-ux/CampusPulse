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


## Visual system — single light neo-brutalist theme

- [ ] No Dark mode or theme selector is shown in desktop navigation or the mobile drawer.
- [ ] The site uses the same warm neutral canvas and bold ink / forest / navy / rust palette on every active route.
- [ ] No blurred glow, text shadow, glass blur or soft focus halo remains. Hard-edged offset shadows may be used sparingly.
- [ ] Primary and secondary action buttons are pill shaped; icon-only actions are circular.
- [ ] Key action icons use consistent circular containers, size and alignment.
- [ ] Heading, body, label and control type sizes remain readable and consistent.
- [ ] Desktop navigation remains one row at 1280px and 1440px widths with no overlap.
- [ ] At tablet/mobile widths, navigation collapses to one header row and the drawer exposes all routes and language selection.
- [ ] Test overview, scholarship directory, scheme detail, checker, document review, rejection, services, tracker, planner and profile.
- [ ] No horizontal page overflow at 375px, 768px, 1024px, 1280px or 1440px.
- [ ] Keyboard focus is visible on links, buttons, form controls and menus.
- [ ] Reduced-motion preference disables nonessential spatial transitions.
- [ ] Run \`npm run lint\`, \`npm run typecheck\`, \`npm run build\`.
