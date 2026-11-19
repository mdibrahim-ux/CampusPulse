# CampusPulse — Dark Product Redesign Plan

**Direction:** Dark Editorial Brutalism × Native-like Motion
**Scope:** Full student experience, not a palette swap.
**Implementation rule:** Preserve domain logic and source facts; rebuild information architecture, layout and interaction around student tasks.

## 1. Research synthesis

### Neo-brutalism and usability
NNGroup describes neo-brutalism through bold contrast, geometric layouts, thick lines, block shadows and oversized type, while warning that the style can become overwhelming without readable copy, restrained colour, clear hierarchy and whitespace.
Reference: https://www.nngroup.com/articles/neobrutalism/

### Apple-inspired materials
Apple's Human Interface Guidelines describe materials as a way to establish depth and hierarchy. Liquid Glass is intended for a distinct functional layer such as navigation and controls, and should be used sparingly rather than across the content layer. CampusPulse applies this principle to floating navigation and transient menus only; content panels remain opaque and readable.
Reference: https://developer.apple.com/design/human-interface-guidelines/materials

### Motion as explanation
Apple's motion guidance says movement should communicate status, instruction or context, not be added gratuitously. Motion's React guidance provides scroll-triggered and scroll-linked animation, while reduced-motion preferences must be respected. The overview will animate a three-step explanation of the actual CampusPulse workflow; page/card animations remain short and state-driven.
References:
- https://developer.apple.com/design/human-interface-guidelines/motion
- https://motion.dev/docs/react-scroll-animations
- https://motion.dev/docs/react-accessibility
- https://motion.dev/docs/react-use-reduced-motion

### Accessibility and legibility
WCAG 2.2 informs contrast, focus, control and target sizing. Apple typography/layout guidance informs readable type, consistent alignment and responsive layout. A dark UI still needs strong foreground contrast; muted colour is reserved for secondary metadata, not essential information.
References:
- https://www.w3.org/TR/WCAG22/
- https://developer.apple.com/design/human-interface-guidelines/typography
- https://developer.apple.com/design/human-interface-guidelines/layout
- https://developer.apple.com/design/human-interface-guidelines/dark-mode

## 2. Current product audit

- The root route redirects to /dashboard; therefore the dashboard is the first-run product overview, not a separate marketing landing page.
- Existing dashboard uses a static hero illustration and several unrelated content blocks. It does not demonstrate what the product does.
- The scholarship directory currently uses card grids with image, provider, amount, deadline and document metadata, but the page hierarchy still reads as a conventional list of cards.
- The prior stylesheet was large and had accumulated visual overrides. It is being replaced by one single-source dark token and component system.
- Existing workflows must remain: scholarship catalogue and detail, eligibility matching, document review, rejection analysis, local office finder, student services, saved tracker, planner, profile and multilingual selection.

## 3. Experience architecture

### Global shell
- A compact floating glass navigation bar, visually separated from the content canvas.
- Primary route order: Overview, Scholarships, Eligibility, Services; My workspace groups Saved, Planner, Document check, Rejection help and Profile.
- One active-route indicator, keyboard-operable menus, profile/language utilities, mobile sheet/drawer.
- Content background remains dark and opaque; transparency is reserved for the nav layer.

### Overview (first screen)
1. Intro: concise value proposition and one high-intent CTA to check eligibility.
2. Animated product walkthrough: three user-controlled stages — Tell us about your situation → Compare scheme rules → Prepare your next action. Labels explicitly mark this as an illustrative flow, not a live eligibility decision.
3. Deadline rail: only schemes with source-backed student application deadlines; clearly show source caveat.
4. Data insight: a small distribution chart computed from the local curated scheme reference set, explicitly labelled as the current CampusPulse reference set (not all national schemes and not user eligibility statistics).
5. Saved schemes and student-services discovery lower on the page, only when relevant.

### Scholarship discovery
- Command-style search and filter toolbar.
- Compact list/grid cards with genuine scheme artwork or issuer logo, explicit image provenance, provider, category, deadline and support amount.
- Strong typographic hierarchy; card body is not a pile of unrelated stat boxes.
- Scheme detail starts with identity and support; eligibility, documents, caveats and office finder remain grouped in a logical reading order.

### Eligibility
- Preserve all questions and the matching engine.
- Introduce section progress and progressive disclosure; group questions by study, scheme-specific conditions and documents.
- Results remain explainable and grouped by Potential match / Needs information / Not a match. Never present as an official eligibility decision.

### Document review
- Dedicated drop zone with clear consent and redaction guidance.
- Once a file is selected, show a clean file state with size/type and remove action.
- Results use distinct sections: identity, purpose, visible issue, corrective next step. Keep limitations visible.

### Rejection analyzer
- Status first, then verification stage, exact portal remark, optional context.
- Result visual hierarchy: what the remark says → likely cause → what can be checked → who to contact.
- Keep distinction between defected and rejected cases.

### Services
- Task-oriented categories (Travel, Money, Records, Software, Cloud).
- Cards prioritise benefit, who qualifies, evidence needed and official provider action.
- Do not imply that all student-email domains automatically unlock every offer.

### Saved, Planner, Profile
- Saved tracker becomes a clean application pipeline with clear status, next step and reminder.
- Planner focuses on upcoming action timeline; keep personal reminders distinct from official scholarship dates.
- Profile becomes an account/preferences panel with privacy, export and reset actions clearly separated.

## 4. Design system

### Dark palette (dark only)
- Void #070A12: app canvas.
- Carbon #0D1220: primary content surface.
- Graphite #141C2D: elevated surface.
- Slate #202B40: borders and secondary surface.
- Mist #E8EDF7: primary text.
- Ash #A3AEC2: secondary text.
- Indigo #7187FF: primary action / selected state.
- Teal #56C7AD: verified / progress.
- Muted amber #D7AB67: deadlines / caution.
- Muted coral #D87970: destructive / rejection only.

### Materials and neo-brutalist structure
- One translucent glass layer for floating navigation and transient command menus.
- Main content uses opaque dark panels, 1px–2px etched outlines and precise hard-edged offset shadows in a dark tone.
- Avoid bright candy-colour card backgrounds, giant glow blur, excessive gradients and floating decorative elements.
- Grid and radial textures only inside the overview's explanatory visual, and only where they help explain the flow.

### Spacing and geometry
- 8px base rhythm; 8 / 12 / 16 / 24 / 32 / 48 / 64 / 88.
- Max content width 1320px; 12-column desktop grid; 2-column tablet; 1-column mobile.
- 14px–18px controls; 18px–24px surface radius; pills only for navigation, status and primary CTA.
- Align headers, content and grids to the same page gutter. No arbitrary card placement.

### Motion
- Route transition: 180ms opacity + small vertical shift.
- Menus: 180–220ms opacity/scale, spring-like ease without overshoot.
- Walkthrough: animated path, node progress and staged content reveal controlled by the user; autoplay only once and pause when offscreen.
- Cards: small border/translate feedback, no continuous float.
- Honour prefers-reduced-motion; disable parallax and looping motion when enabled.

## 5. Data visualisation rules
- The overview chart counts the five currently curated scheme records by their actual category prefix. It is not labelled as a nationwide scholarship distribution.
- Deadline visualisation uses only explicit studentDeadline values from the scheme dataset.
- No fake student counts, fake success rate, fake eligibility percentages, fictional AI confidence or fabricated savings.

## 6. Scholarship art policy
Use real scheme artwork or authentic issuer identity assets already curated in lib/scholarship-branding.ts. Keep original colours and aspect ratios. Each mark is labelled as Scheme artwork or Issuing authority logo and retains a source credit. Do not generate or modify government marks.

## 7. Implementation sequence
1. Commit this plan.
2. Rebuild AppShell and global design tokens/navigation.
3. Implement animated overview story and data-driven chart.
4. Rebuild scholarship directory and detail page hierarchy using authentic marks.
5. Apply the new component system to eligibility, document, rejection, services, tracker, planner, profile and office finder.
6. Verify npm run lint, npm run typecheck and npm run build through GitHub Actions.
7. Provide update commands and disclose any remaining external asset/provider caveats.

## 8. Acceptance criteria
- Dark appearance is consistent across every route; no large white page backgrounds or bright pastel content panels remain.
- Navigation is easy to understand at desktop and mobile sizes.
- Overview explains the product through the actual student workflow and includes one honest chart from real local scheme data.
- Every feature remains reachable and its existing domain logic is preserved.
- Motion is informative, smooth and respects reduced-motion preferences.
- Scheme images preserve authenticity and attribution.
- No fabricated outcome metrics or decorative widgets unrelated to student tasks.
- Build, lint and typecheck pass.