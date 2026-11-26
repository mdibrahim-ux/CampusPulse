# CampusPulse — Dark Neo-Brutalist Landing Plan

**Date:** 21 November 2026  
**Scope:** Overview landing page, shared desktop/mobile navigation, global colour tokens, action controls and route-wide visual foundations.  
**Implementation branch:** `design/dark-neo-brutalist-landing`

## 1. Product context

CampusPulse is an independent student-support workspace. It helps students discover scholarships, compare preliminary eligibility, prepare documents, understand portal defects/rejection remarks, find official support routes and organise personal reminders.

The overview presents real product tasks first. It does not invent application success rates, student testimonials or scholarship totals beyond the locally curated dataset. Scholarship deadlines retain a dated source snapshot and should be reconfirmed with the official portal.

## 2. External design research

### Nielsen Norman Group — Neobrutalism: Definition and Best Practices
https://www.nngroup.com/articles/neobrutalism/

Use the recognisable language of high contrast, block-based layouts, bold colour, visible geometry and strong boundaries, while protecting readability, whitespace, clear controls and accessible colour contrast.

### Webflow — Brutalist website design: a guide with 11 inspiring examples
https://webflow.com/blog/10-brutalist-websites

The examples demonstrate that the style is content-led rather than one fixed template. The LORD reference uses a pill-shaped navigation treatment and bold red/black section changes. The transferable lesson is confident, legible navigation and deliberate visual rhythm—not a copied composition.

### NeoBrutalism UI — React / Next.js component patterns
https://www.neobrutalism.dev/

Use as a reference for repeatable component treatments and design consistency. Existing CampusPulse React, Framer Motion and Lucide dependencies remain the implementation foundation; do not add a component kit solely for appearance.

### Curated — Neobrutalism collection
https://curated.design/inspiration/neobrutalism/

Use as a visual survey of varied production interpretations, including dark treatments, rather than copying a single site.

### Brutalist Web Design guidelines
https://brutalistwebdesign.com/

Keep pages readable across devices, controls clearly identifiable, decoration relevant and the interface performant.

### Accessibility and motion
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Motion accessibility: https://motion.dev/docs/react-accessibility
- Motion component performance: https://motion.dev/docs/react-motion-component

Respect reduced-motion preferences, maintain keyboard-visible focus and use transform/opacity for short transitions instead of animating layout.

## 3. Chosen direction

**Dark Neo-Brutalism × Editorial Product UI.**

This is a functional student-workspace interpretation of brutalism, not a noisy portfolio. It combines intentional boundaries, graphic type hierarchy, hard-offset shadows and bold flat fills with clear content hierarchy and predictable controls.

Traditional brutalist designs often use rectangular buttons; CampusPulse deliberately combines their graphic grammar with the requested filled pill buttons.

### Palette

| Token | Value | Purpose |
|---|---|---|
| Midnight Ink | `#0B0C10` | App canvas |
| Raised Ink | `#15171E` | Main surfaces |
| Graphite | `#20232C` | Raised surfaces and controls |
| Warm White | `#F6F2EB` | Primary typography |
| Soft Slate | `#C5C7D0` | Supporting text |
| Signal Coral | `#FF6554` | Primary action and active states |
| Electric Cobalt | `#777EFF` | Secondary actions and navigation accents |
| Scholar Amber | `#FFC85B` | Warnings and third accent |
| Lavender Signal | `#AEB4FF` | Non-green status accent |
| Graphite Line | `#4C505C` | Secondary borders |

No green is used as a brand, navigation, action or decorative accent. Coral, cobalt, amber and lavender carry purposeful visual hierarchy.

### Typography

Use the existing Inter system stack already present in the product. Large, tightly set heavy headings establish the editorial voice; body copy, forms and scholarship criteria remain comfortably readable.

### Navigation

- Desktop: one capsule-shaped row with brand, four primary routes, workspace menu, language selector and profile.
- Each primary navigation icon sits inside a circular holder.
- Active route uses a filled coral pill with dark foreground; other routes use restrained dark surfaces.
- Collapse to the mobile drawer before desktop width becomes cramped; never wrap or overlap navigation.
- Workspace popover and mobile drawer share the same visual language and close on route selection or Escape.

### Landing-page information architecture

1. Editorial hero: “Your next move. Made clearer.” with two clear actions.
2. Product-route panel showing Discover → Check → Prepare.
3. Three high-value task routes: scholarships, eligibility and document review.
4. Upcoming student application deadlines, with the source-check caveat.
5. Locally saved scholarships and personal reminders.
6. Student-services route.

Scholarship data, deadline fields, tracker and reminders continue to come from existing application modules and local storage.

### Components

- Filled capsule CTA buttons with circular icon holders.
- Capsule navigation items with circular icon wells.
- Reusable task cards with circular icon holders.
- Opaque dark panels with visible borders and hard-offset shadows.
- Inputs and selectors use dark control surfaces; no white native controls in the dark interface.

### Motion

- Active navigation state uses the existing Framer Motion layout animation.
- Buttons have a short tactile press response.
- Cards lift by 1–2px on hover; menus and route transitions use opacity and small transforms.
- No glow, blur, continuous float loops or motion that changes layout.
- Respect `prefers-reduced-motion`.

## 4. Implementation decisions

- Preserve Next.js App Router and current page/domain logic.
- Preserve the existing Framer Motion and Lucide dependencies.
- Rebuild the overview composition around actual product tasks and data.
- Consolidate appended visual override blocks into one named theme layer rather than layering conflicting CSS patches.
- Keep all active routes readable using the shared dark tokens.
- Open the application in the requested dark direction; no extra theme switcher is introduced.

## 5. Acceptance criteria

- Dark palette with no green accent usage.
- Single-row desktop capsule navigation; no wrap or overlap.
- Circular navigation and task icon holders.
- Filled pill-shaped primary and secondary actions.
- Landing hero clearly communicates the student workflow.
- Existing routes, scholarship data, deadline notes, tracker and reminder behaviour remain intact.
- Interactive elements remain keyboard accessible.
- Motion is smooth, brief and reduced-motion aware.
- No fake performance metrics, misleading official status or invented scholarship facts.
- TypeScript, lint and production build should pass before merge; browser-level responsive QA should be recorded separately.
