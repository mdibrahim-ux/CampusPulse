# CampusPulse — Full UI/UX Redesign Plan

**Release:** Editorial Neo-Brutalism / 2026  
**Repository:** mdibrahim-ux/CampusPulse  
**Scope:** All routes, shared navigation, scholarship cards, forms, tracker, services, planner and document workflows.

## 1. Research and design references

- **NeoBrutalism.com component system** — React component library using thick borders, hard shadows, loud colour and reusable primitives. Reference: https://neobrutalism.com/components
- **NNGroup: Neobrutalism — Definition and Best Practices** — warns that the style can become dizzying or unusable if visual emphasis is not balanced with usability. Reference: https://www.nngroup.com/articles/neobrutalism/
- **W3C WCAG 2.2** — keyboard interaction, focus visibility, text spacing, contrast and target-size requirements. Reference: https://www.w3.org/TR/WCAG22/
- **Motion for React: useReducedMotion** — adapt or disable movement for users who prefer reduced motion. Reference: https://motion.dev/docs/react-use-reduced-motion
- **Lucide icon guidelines** — consistent stroke-based SVG icons, default 2px stroke. Reference: https://lucide.dev/guide/lucide/basics/stroke-width
- **UX4G Government Logo Library** — official government logo usage, image proportions, clear space and colour handling. Reference: https://www.ux4g.gov.in/resources/logos
- **National Scholarship Portal** — live AY 2026–27 scholarship listing and official scheme references. Reference: https://scholarships.gov.in/All-Scholarships

## 2. Audit findings

1. The global stylesheet has accumulated multiple generations of overrides. The same components receive conflicting values for colours, spacing, shadows and responsive behaviour.
2. Top navigation, forms, cards and side panels do not share one spacing or geometry system.
3. The scholarship directory is mostly text-first and lacks visual identity for the issuing authority or scheme.
4. Decorative treatments compete with primary actions. The interface needs a clear hierarchy: what the student should do first, what information supports that action, and where official verification happens.
5. The existing scholarship checker, document review, rejection analysis, local office finder and student services workflows must be preserved while their presentation is improved.

## 3. Brand and visual system

### Palette
- Midnight Ink: #10172D — app shell, high-priority text, dark anchors.
- Electric Cobalt: #3457F5 — primary actions and navigation selection.
- Scholar Amber: #F9C846 — deadline and attention accents.
- Jade: #00B88A — verified / completed / positive states.
- Signal Coral: #F36E5B — errors and caution, not general decoration.
- Cloud: #F4F3ED — warm neutral canvas.
- Steel: #E4E9F2 — quiet surfaces, separators and inactive controls.

### Geometry
- 2px ink outlines for primary panels and important interactive components.
- 5px / 7px hard shadows used consistently; no large blurred shadows.
- 12px control radius, 18px card radius, 24px hero radius; pill shape reserved for navigation, tags and buttons.
- 8-point spacing scale: 8 / 16 / 24 / 32 / 40 / 48 / 64.
- 12-column desktop layout with responsive 2-column and 1-column breakpoints.

### Typography and icons
- Display type: bold, compact sans-serif with clear line breaks.
- Body text: readable 14–16px, comfortable line height.
- Metadata: smaller but high-contrast; do not use low-opacity text for essential facts.
- Lucide icon family, consistent 2px stroke, mostly 18–22px. Icons sit in aligned icon tiles; no random floating symbols.

## 4. Page-by-page experience plan

### Overview
- One distinctive dark hero with a single primary action.
- A compact “Closing soon” strip based on source-backed student application deadlines.
- Three clear task paths: find a scholarship, check a document, understand a rejection.
- Saved scholarships and student services shown below the fold.
- No invented profile metrics or oversized dashboard clutter.

### Scholarship directory
- Search and category filters are grouped in one filter bar.
- Scholarship cards use consistent image, category, scheme title, support amount, deadline, issuer and actions.
- Image type is explicitly identified: scheme artwork or issuing-authority logo.
- The source link and date remain available but do not dominate the card.

### Scholarship details
- A scheme identity header with the real scheme/provider mark.
- Clear sections for financial support, eligibility rules, document preparation, caveats and official apply link.
- Office finder remains a separate, clearly labelled local-support module.

### Eligibility checker
- Group questions into logical steps, with stronger progress and completion feedback.
- Keep privacy notice visible but compact.
- Results grouped by Potential match / Needs information / Not a match, each with an explanation.
- No guarantee of eligibility.

### Document review
- Large and precise upload surface, clear accepted formats and redaction warning.
- Analysis split into document identity, purpose, visible issues and next steps.
- No upload action until consent is explicit.

### Rejection analyzer
- Clear distinction between defected, rejected and pending statuses.
- Portal reason field gets the visual priority.
- Results use issue / why it matters / next action sections.

### Student services
- Category-led cards with one strong icon tile, concise eligibility and benefit copy.
- Provider links have consistent external-link placement.

### Saved tracker and planner
- Consistent status pills and readable row structure.
- Details expanded on demand rather than presenting all controls at once.
- Personal reminders remain separate from official scholarship deadlines.

### Profile
- Student details, completion hints and privacy controls are clearly separated.
- Destructive reset action is visually distinct from save/export.

## 5. Motion and interaction rules

- Page transitions: 160–220ms, subtle opacity/vertical movement.
- Button hover: 140–180ms with a 1–2px lift and hard-shadow shift.
- Card hover: 160–200ms, border/shadow only; no large scale jumps.
- Hero entrance: brief stagger, once per load.
- No perpetual bouncing, cursor-following decoration or parallax on content.
- Respect prefers-reduced-motion throughout.

## 6. Scholarship image policy

Use genuine imagery that exists for the named scheme or its issuing authority. Do not create approximate or AI-generated government emblems. Preserve the original aspect ratio and brand colours. Label the image as “Scheme artwork” or “Issuing authority logo” where the scheme does not publish its own logo. Current image sources selected for the five curated entries:
- PM-USP CSSS: Ministry of Education identity image from IIT Kanpur's SATHEE portal — https://sathee.iitk.ac.in/images/home/logos/en/moe-logo.png
- AICTE Pragati: published Pragati scheme artwork — https://images.moneycontrol.com/static-hindinews/2025/08/AICTE-Pragati-Scholarship.jpg?height=900&impolicy=website&width=1600
- AICTE Saksham: published Saksham scheme poster from an AICTE-linked college — https://tgpcet.com/assets/AICTE-SCHOLARSHIP/SAKSHAM.jpeg
- Top Class SC: Government of India National Emblem from the UX4G approved logo library — https://www.ux4g.gov.in/aboutus/assets/img/logos-page/Emblem_of_India%202.png
- DEPwD Post-Matric: official DEPwD scholarship-scheme artwork — https://cdnbbsr.s3waas.gov.in/s3e58aea67b01fa747687f038dfde066f6/uploads/2026/05/202605201284019486.jpeg

These sources are visual identity references; the official scheme conditions and application route must still be checked against the linked government scheme page.

## 7. Acceptance checks

- All routes use the same colour, spacing, typography, button and card system.
- Desktop and mobile navigation have a clear selected state and predictable grouping.
- Primary controls have comfortable hit areas and visible focus indicators.
- Text and component contrast meet WCAG 2.2 AA targets where applicable.
- Motion is disabled or reduced for users who request it.
- All five scholarship cards display the correct real provider/scheme image and alt text.
- Scholarship detail, eligibility, document review, rejection analysis, office finder, services, saved tracker, planner and profile remain functional.
- npm run lint, npm run typecheck, and npm run build pass in GitHub Actions.
