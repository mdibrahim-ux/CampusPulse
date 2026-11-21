# CampusPulse component-library implementation

## Goal

Translate the supplied repeated UI examples into reusable components that fit CampusPulse's existing dark neo-brutalist design system and Next.js application. Avoid copying duplicate demo snippets or introducing a second design framework.

## Repository inspection

- Next.js App Router with React and TypeScript.
- Existing project dependencies include Framer Motion, Lucide, Recharts and Zod.
- The repository did not contain the referenced `components/ui` library or the Radix/Base UI primitives expected by an untouched shadcn copy.
- Existing workflows already manage document analysis, local reminders and local student profile data.

## Implementation strategy

1. Build project-native compound components with familiar names and export shapes.
2. Reuse existing React, Framer Motion, Lucide and Recharts packages.
3. Add only small utility/form dependencies needed for class merging and the supplied React Hook Form + Zod pattern.
4. Style components using shared CampusPulse tokens: midnight graphite surfaces, warm-white copy, signal-coral and electric-cobalt actions, circular icon holders, strong borders and hard-offset shadows.
5. Connect components to real workflows where the semantics fit; keep other patterns available in a component preview gallery.
6. Run the GitHub Actions production build and correct any typing or build failures.

## Component mapping

| Supplied pattern | CampusPulse implementation |
|---|---|
| Attachment rows, upload and file states | `attachment.tsx`; connected to document review |
| Avatar and fallback | `avatar.tsx`; connected to profile |
| Button variants and button groups | `button.tsx`, `button-group.tsx` |
| Card primitives | `card.tsx` |
| Checkbox, radio group, switch and slider | Native controlled input wrappers |
| Field and React Hook Form components | `field.tsx`, `form.tsx` |
| Calendar and date picker | `calendar.tsx`, `date-picker.tsx`; connected to planner |
| Progress, spinner, skeleton and empty | Shared status/feedback primitives |
| Dropdown, command, context menu, menubar and navigation menu | Native menu components with interaction states |
| Dialog, drawer, popover and hover card | Framer Motion overlay primitives |
| Collapsible and questionnaire | Controlled state/step primitives |
| Carousel and image card | Native scroll carousel and presentational media card |
| Chart wrappers | Recharts container and tooltip helpers |
| Table, pagination and sidebar | Data and layout primitives |

Repeated demo snippets are consolidated. Some components are preview-only because CampusPulse does not yet have a matching operational workflow.

## Product integrations

### Document review
- Added a drag/drop picker and file attachment row.
- Reflects idle, uploading, failed and complete states.
- Retains the existing document-analysis API call, 8 MB size check, consent, redaction guidance and privacy disclosure.
- No new file storage destination was introduced.

### Planner
- Uses the date picker and calendar for personal reminder dates.
- Uses progress to display completed versus total reminders.
- Preserves the existing `Reminder` type, `getReminders` / `saveReminders` functions and browser-local storage.
- Does not add notifications or imply automatic provider deadline syncing.

### Profile
- Uses avatar fallback for profile initials and progress for profile completeness.
- Profile data remains in existing local browser storage.

### Component preview
- `/component-library` demonstrates reusable patterns in one route.
- Values shown in the sample chart and sample file rows are demonstration content only, not actual scholarship statistics.

## Dependencies
- `clsx` and `tailwind-merge` for the `cn` class helper.
- `react-hook-form` and `@hookform/resolvers` for the supplied form pattern.
- Recharts was already present and is reused.

## Acceptance checks
- Components compile with current TypeScript settings.
- Document review still uses the existing API endpoint and privacy flow.
- Planner still stores reminders through existing local-storage functions.
- Profile remains local-only.
- Components use the CampusPulse dark palette.
- GitHub Actions production build passes.
