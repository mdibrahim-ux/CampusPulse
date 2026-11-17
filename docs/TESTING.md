# Manual acceptance checklist

## Onboarding and profile
- [ ] Fresh user sees setup guidance, not an invented person.
- [ ] Enter education, programme, year, city/state, skills and interests.
- [ ] Save, refresh and verify profile persistence.
- [ ] Export profile/tracker/reminders to JSON.
- [ ] Clear local data and verify reset.

## Discovery and detail
- [ ] Category, keyword and source-type filters change results.
- [ ] Each card opens a detail page.
- [ ] Detail shows source class, last-checked date, status note and official URL.
- [ ] Match section separates aligned signals, gaps and unknown conditions.
- [ ] No match is presented as official eligibility.
- [ ] Provider action opens the source in a new tab.

## Tracker and planner
- [ ] Save item and see it on tracker/dashboard.
- [ ] Refresh and verify record persists.
- [ ] Edit status, next action, reminder date and notes; refresh and verify.
- [ ] Remove record.
- [ ] Create reminder, mark complete, delete and refresh.
- [ ] Personal reminders are not labelled as provider deadlines.

## Quality
- [ ] Navigation works on desktop and mobile.
- [ ] Keyboard focus is visible.
- [ ] Reduced-motion preference disables nonessential animation.
- [ ] Small viewport has no horizontal overflow.
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`