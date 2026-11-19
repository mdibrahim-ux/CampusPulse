# CampusPulse — Simple Neo-Brutalist Redesign Plan

**Date:** 19 November 2026  
**Scope:** All active application routes, shared navigation, controls, responsive layout and theme system  
**Implementation target:** Next.js App Router on `main`

## 1. Audit findings

The current application routes and domain logic were inspected before design work.

The route inventory is scholarship-first:
- `/dashboard` — overview; `/` redirects here.
- `/scholarships` and `/scholarships/[id]` — scheme directory and detail.
- `/eligibility-checker` — progressive four-step condition and document assessment.
- `/document-review` and `/rejection-analyzer` — consent-gated AI assistance.
- `/services` — student services directory.
- `/tracker`, `/planner`, `/profile` — local-first workspace.
- Legacy `/opportunities`, `/sources` and `/get-started` redirect to the scholarship workflows.

### Screenshot and code defects

The supplied screenshot shows a broken header with the primary navigation, workspace action, language selector, profile and mobile menu wrapping into separate rows. The content also sits against a white page canvas, the breadcrumb is visually detached, and the language select uses a native white surface.

Code inspection identified the underlying CSS issue: the current `app/globals.css` contains only the most recently appended visual block and no longer includes the original global reset, root typography, form-control foundation or complete component styles. The visual system therefore depends on styles that are absent. Incremental CSS overrides would leave the cascade fragile.

The prior home screen also reads like a promotional cover instead of a student workspace. It should start with actual student tasks and useful information.

## 2. Reference research and analysis

### Nielsen Norman Group — Neobrutalism: Definition and Best Practices
https://www.nngroup.com/articles/neobrutalism/

NN/g describes neobrutalism through high contrast, block layouts, bold colour, thick strokes and visible geometry. It warns that the style can overwhelm users without readable body type, clear controls, whitespace and contrast discipline. It also points to Gumroad, Figma, Tony's Chocolonely, cyanbanister and Dodonut as examples or practice references.

Design decision: use the hard outline / flat-fill / bold-type grammar, but preserve predictable product navigation, readable body copy and generous content spacing.

### Gumroad — live creator-commerce homepage
https://gumroad.com/

The live homepage leads with a direct value proposition, a single dominant action and a short set of product explanations. Its high-contrast visual language is attached to a clear information hierarchy instead of making every section compete.

Design decision: make each CampusPulse panel say what the student can do, and give each section one clear next action. Do not reproduce Gumroad's decorative imagery or marketing tone.

### NeoBrutalism.com — React / Next component library
https://neobrutalism.com/

The live library demonstrates neo-brutalist components as reusable patterns: buttons, cards, blocks and dark-mode styling. Its value for this project is consistency across the interface, not a ready-made page to copy.

Design decision: establish reusable tokens and shared control/card treatments, with both light and dark theme values.

### Webflow — Made in Webflow, Neo Brutalism showcase
https://webflow.com/made-in-webflow/neo%20brutalism

This is a browseable collection of community-built sites, useful for comparing different interpretations rather than assuming there is one canonical template.

Design decision: use a restrained product-interface variant, not a chaotic portfolio / campaign variant.

### Figma — current product homepage
https://www.figma.com/

The current homepage is not treated as a strict neo-brutalist reference. NN/g identifies Figma's expressive and high-contrast brand work as an influential example, while Figma's 2024 brand direction moved away from some earlier heavy-outline styling. The useful transferable lesson is its bold typographic hierarchy and confident use of visual grouping, not its full brand identity.

Design decision: keep typography expressive in headings but neutral and legible in forms, instructions and scheme rules.

### Webflow / HubSpot and curated live-site analyses
https://webflow.com/blog/10-brutalist-websites  
https://blog.hubspot.com/website/neo-brutalism  
https://curated.design/inspiration/neobrutalism/  
https://brutalweb.com/

These galleries help distinguish pure brutalism from neo-brutalism and show how strongly the visual language varies by content. A creative showcase can tolerate eccentric movement that would obstruct a multi-step application checker.

Design decision: CampusPulse uses the orderly, product-focused end of neo-brutalism.

### Accessibility and motion references
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Motion accessibility: https://motion.dev/docs/react-accessibility
- Motion performance: https://motion.dev/docs/react-motion-component
- Tailwind manual theme selectors: https://tailwindcss.com/docs/dark-mode

Design decision: target 4.5:1 normal-text contrast and 3:1 UI contrast where applicable; use visible keyboard focus; honour reduced motion; prefer `transform` and `opacity` for transitions; and toggle themes with an explicit root data attribute.

## 3. Chosen visual direction

**Direction:** simple, professional neo-brutalism for an everyday student workspace.

### Structure
- Strict responsive grid and consistent spacing scale.
- Flat surfaces, clear panel boundaries and visible section dividers.
- 2px outlines on key cards, inputs and buttons.
- Small, deliberate hard-offset shadow on primary actions and selected cards; no blurred shadows.
- Consistent modest corner radius (8–12px) rather than random shape changes.
- Pill treatment reserved for segmented selectors and compact filters where it improves interaction; main cards and form controls remain structured rectangles.

### Type
- Use reliable system sans-serif stacks; do not depend on remote font loading to preserve layout.
- Use weight and size for hierarchy, not letter-spacing tricks or tiny mono labels everywhere.
- Body and form text remain comfortable to read at normal UI sizes.
- No default serif controls or uncontrolled browser-native white selects.

### Palette and themes
Two complete, equally considered themes are required.

**Light**
- Warm off-white app canvas.
- Near-white card surface.
- Near-black text and outlines.
- One acid-lime action colour plus a restrained periwinkle secondary accent.
- Dark text on coloured action surfaces where that gives better contrast.

**Dark**
- Deep charcoal canvas.
- Raised charcoal surfaces.
- Warm off-white text.
- Light ink-like borders with hard dark shadows.
- The same acid-lime and periwinkle accents, tuned for dark backgrounds.

No gradient backgrounds, glassmorphism, decorative floating stickers or oversized promotional banner. Theme choice persists in localStorage and is available from the global navigation on desktop and mobile. First visit follows the system preference; an explicit choice is remembered.

## 4. Application-wide design system

Build one complete source of truth in `app/globals.css`:
- Root design tokens for both themes.
- Global reset, typography, body and control defaults.
- Responsive app shell and navigation.
- Shared buttons, inputs, labels, notices, section headings, cards, badges, empty states and form patterns.
- Route-specific page layout classes grouped by page family.
- One reduced-motion rule set and visible focus styles.

Remove the prior comic / field-guide styling rather than layering over it.

## 5. Page-by-page redesign

### A. Overview dashboard (`/dashboard`)
- Remove the oversized promotional cover / billboard hero.
- Start with a compact page heading and a clear primary action to check eligibility.
- Organize the first viewport around useful student tasks: eligibility check, scholarship search, document review and rejection support.
- Use a real upcoming-deadlines list from existing scheme records, clearly identifying the student application window and source-check date.
- Use the current local scheme category tally only as a small reference chart, clearly labelled as the curated CampusPulse records rather than national statistics.
- Include saved scholarships and personal reminders from local storage.
- Do not introduce invented KPIs, success rates or eligibility outcomes.

### B. Scholarship directory
- Remove the decorative hero banner.
- Put the page heading, count, search and category filters together in a compact directory toolbar.
- Give scheme cards a consistent layout for scheme, provider, category, source status, deadline and document count.
- Keep authentic existing scheme artwork / source attribution where available.
- Make the entire card and its detail action behave predictably.

### C. Scholarship detail
- Use a consistent title / provider / category header.
- Keep published conditions, required-document list and caveats in clear reading sections.
- Use a sticky source and status panel on wide layouts; stack it naturally on mobile.
- Keep the existing office / officer finder and official directory links intact.
- Do not invent office contacts or scheme officers.

### D. Eligibility checker
- Preserve the four-step progressive disclosure flow and deterministic eligibility engine.
- Visually unify the step header, progress indicator, document checklist, navigation controls and result states.
- Keep missing documents separate from hard eligibility conflicts.
- Do not store sensitive answers automatically.

### E. Document review and rejection analysis
- Use a clear form / guidance split on desktop and one-column flow on narrow screens.
- Make the upload zone, consent checkbox, redaction notice, submit state, errors and result output visually distinct.
- Keep all existing consent, API and privacy behaviour.
- Present AI analysis as preliminary guidance, never official authentication or a guaranteed reversal.

### F. Student Services
- Make the directory the main content, with a compact title, featured service links, search and category filter.
- Give service cards consistent “what you get”, “who can use it”, verification and external-link sections.
- Preserve the existing service facts and cautions.

### G. Tracker, Planner and Profile
- Use a shared page heading, metric strip derived from local data, clear list/form cards and meaningful empty states.
- Preserve local storage behaviour, reminder actions, status editing, export and clear controls.
- Distinguish personal reminder dates from official scheme closing dates.

## 6. Navigation and theme behaviour

Desktop:
- One aligned row: brand, primary route links, workspace menu, theme selector, language selector and profile.
- Never wrap actions onto a second line.
- At a width where all controls cannot fit comfortably, collapse to mobile navigation before overlap.

Mobile:
- One compact header row.
- A single drawer contains all navigation routes, workspace actions, theme selector and language selector.
- Drawer closes on route selection and Escape.
- Focus is visible; controls have accessible names.

Theme:
- Root `data-theme="light|dark"` controls CSS variables.
- First visit follows `prefers-color-scheme`.
- Manual Light / Dark selection is persistent in localStorage.
- Bootstrap theme before first paint to avoid a flash of the wrong theme.
- Set `color-scheme` so native date/select controls follow the selected theme.

## 7. Motion direction

Neo-brutalism should feel tactile, not bouncy.
- Buttons: short press state that moves into the hard shadow.
- Navigation: a short active-state transition.
- Menus and dialogs: opacity + small transform only.
- Cards: restrained 1–2px lift or border shift on hover.
- Section entrance: brief opacity/transform reveal only where useful.
- Respect `prefers-reduced-motion`; remove nonessential spatial transitions.
- Do not use continuous orbit / floating loops, heavy blur or layout-affecting animation.

## 8. Implementation order

1. Add this plan and update the architecture notes to remove obsolete visual directions.
2. Add the persistent theme selector and pre-paint theme initialization.
3. Rebuild the global stylesheet from a clean base with complete light/dark tokens.
4. Rebuild the app shell and mobile navigation to a strict single-row / drawer model.
5. Recompose the dashboard and scholarship directory so the app opens as a workspace, not a promotional splash.
6. Retheme / re-layout the remaining active route families using their existing class structures and preserve their interactions.
7. Run production build, typecheck and lint. Resolve all new errors and warnings.
8. Validate responsive assumptions at 375, 768, 1024, 1280 and 1440 CSS-pixel widths; verify theme persistence, controls, no layout overflow and keyboard access.

## 9. Acceptance criteria

- No comic styling, speech bubbles, stickers or oversized promotional banner.
- One consistent neo-brutalist system across every active route.
- Both light and dark themes are complete and selectable.
- Theme preference persists after refresh and across routes.
- Header never wraps or overlaps; mobile navigation is a compact drawer.
- No white native controls appear in dark theme; no browser-default serif text appears.
- Every visible button, menu and filter has a working action.
- Forms, errors, upload zones, results and notices remain readable and aligned.
- No CSS cascade patches or duplicate conflicting theme blocks remain.
- Existing scholarship, eligibility, document, rejection, services, office, tracker, planner, profile and language functionality remains intact.
- Production build, TypeScript and lint checks pass; browser visual QA is recorded honestly.
