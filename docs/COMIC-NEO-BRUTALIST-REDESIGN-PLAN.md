# CampusPulse — Comic Neo-Brutalist Redesign Plan

**Status:** Research and implementation plan  
**Scope:** Overview/home page, global navigation, shared visual tokens and motion behavior  
**Branch:** `main`

## 1. What the supplied screenshot tells us

The previous pass did not achieve the intended direction. The screen reads as a dark dashboard with comic-themed decorations layered on top, rather than a coherent comic/neo-brutalist design system.

Specific issues visible in the screenshot:

- The header breaks into multiple rows and loses its intended hierarchy. The primary navigation, workspace control, language selector, profile control and menu button do not behave like one deliberate responsive system.
- Some elements appear to fall back to browser-default styling: the language select is white, and the breadcrumb/labels look serif and oversized compared with the rest of the interface.
- The hero is overloaded with decorative devices (speech bubble, orbit badge, star sticker, pseudo-browser checklist). They compete with the message and obscure the panel composition.
- Comic styling is mostly literal decoration. There is no clear page rhythm based on sequential panels, no disciplined print language, and no visual system that carries from the hero into the action modules.
- Large dark areas and low-scale labels make the experience feel unfinished. The visual hierarchy changes abruptly between the hero, navigation and content.
- Motion is currently mostly entrance/float effects. It does not make the product workflow easier to understand and has no clear interaction choreography.

## 2. Research and design principles

The redesign uses the following references as guardrails, not templates:

1. **NN/g — Neobrutalism: Definition and Best Practices**  
   https://www.nngroup.com/articles/neobrutalism/  
   Use block-based composition, bold typography, high contrast and visible structure. Preserve clear hierarchy, readable copy, useful whitespace and obvious controls; visual intensity must not make the product hard to use.

2. **BUM! Studio design study — Copula**  
   https://copuladev.com/home/work/design-2/  
   Use the comic-cover/panel idea to establish the genre quickly, then let the content and primary task become the focus. Treat speech balloons and comic conventions as occasional devices, not universal decoration.

3. **FlowFest 2025 — Webflow project entry**  
   https://webflow.com/made-in-webflow/website/flowfest-2025  
   Reference for playful, authored animation choreography and SVG-led motion. Borrow the intentional sequencing, not the colour palette or event-site spectacle.

4. **Motion — Animation performance**  
   https://motion.dev/docs/performance  
   Prioritize `transform` and `opacity` for continuous motion; avoid repeatedly animating layout properties and avoid effects that cause expensive reflow/repaint.

5. **Motion — Accessibility**  
   https://motion.dev/docs/react-accessibility  
   Respect `prefers-reduced-motion`: replace large spatial movement with short opacity transitions and disable parallax/ambient movement when motion reduction is requested.

6. **W3C — WCAG 2.2**  
   https://www.w3.org/TR/WCAG22/  
   Keep contrast, keyboard focus, text resizing and target sizing part of the design acceptance criteria. Visual styling cannot remove usable focus indication.

## 3. Art direction

### Creative concept: editorial comic, not cartoon dashboard

CampusPulse should feel like a premium student field guide / graphic novel issue: purposeful panels, strong typographic pacing, a visible grid, and just enough print texture to create character.

- **Canvas:** deep charcoal / ink black. No white page canvas, bright card surfaces or pastel panels.
- **Surfaces:** flat opaque dark panels, each clearly separated by 2px ink-like outlines. Use one consistent hard offset shadow direction (3–5px, zero blur) for selected panels and controls.
- **Accent palette:** restrict to two authored spot colours (muted acid/chartreuse and warm vermilion) plus a cool neutral for secondary data. Accents should mark meaning and action, not decorate every object.
- **Panel grammar:** deliberate asymmetry, visible gutters, numbered chapter markers and occasional cropped/angled panel edges. Panels align to a disciplined grid even where the composition is asymmetric.
- **Comic devices:** halftone, speed lines, registration marks and screen-tone patterns appear in one or two focal areas only. No random stars, speech bubbles, or floating sticker clutter.
- **Typography:** one strong display family for headlines and a highly legible sans-serif for body/UI. Use a dependable system fallback stack so a font-loading failure never turns the interface into browser-default serif typography.
- **Controls:** all primary and secondary actions use consistent pill-shaped buttons, with clear hover, pressed, disabled and keyboard-focus states. Inputs and selects inherit the interface font and dark surface.
- **Image/illustration:** avoid generic AI-looking decorative pseudo-app mockups. Use real product information, deliberate vector/CSS illustration, or actual CampusPulse UI fragments. Any preview must be explicitly illustrative, not represented as a real student result.

## 4. Home page information architecture

1. **Top-level navigation**
   - One compact, single-row shell at desktop widths.
   - Brand at left; primary destinations in a centered pill group; workspace as one grouped menu; language and profile controls aligned right.
   - No wrapping, oversized empty rows or default browser select styling.
   - At narrow widths, collapse to one compact header row and a keyboard-accessible drawer. Move secondary actions into the drawer.
   - Preserve the current destinations, language selector and active route states.

2. **Hero / cover panel**
   - A single clear message focused on scholarship support and next actions.
   - Asymmetric two-column composition: typographic cover headline and two clear CTAs on one side; a compact 3-panel workflow story on the other.
   - Story panels explain: provide study context → compare official scheme conditions → prepare the next action. They must not fabricate eligibility results, application outcomes or success statistics.
   - Use layered ink shapes, a limited halftone field, and one controlled accent cutout. Remove the previous pseudo-browser sheet, speech bubble, rotating badge and multiple stickers.

3. **Workflow storyboard**
   - A real interactive sequence with three selectable panels.
   - Animate panel changes with shared layout / crossfade and restrained directional movement; labels and copy change with the selected stage.
   - Keep all steps understandable without animation.

4. **Primary tasks**
   - Three consistent, high-contrast panels for eligibility, document review and rejection analysis.
   - The whole panel is clickable, with a pill CTA and accessible focus state.
   - Give each panel an intentional accent identity without changing information architecture.

5. **Deadline and reference data**
   - Retain existing live-from-local-data deadline calculation and official-source caveat.
   - Keep counts/charts explicitly limited to the curated local scheme records. Never describe that set as a national distribution or imply user success statistics.
   - Use a structured editorial data panel rather than generic dashboard cards.

6. **Saved schemes**
   - Retain live tracker integration and empty state.
   - Give saved items a compact list treatment with direct navigation to details and the tracker.

## 5. Motion direction

Motion should feel authored and smooth, not constantly animated.

- **Page entrance:** short opacity + 8–12px y transition; no full-screen dramatic reveals.
- **Hero sequence:** headline and copy appear in a tight stagger; the storyboard panels reveal in order with a short delay. Do not animate every decorative layer independently.
- **Scroll reveal:** one-time, viewport-triggered opacity/transform on section groups; no heavy continuous parallax.
- **Panel interaction:** use shared layout positioning or crossfade for selected storyboard state. Keep the content stable and avoid layout jump.
- **Buttons:** quick pressed state translates toward the hard shadow and reduces the shadow offset; use transform only.
- **Navigation:** active pill moves smoothly between tabs; menu opens with a short fade/scale from the nav anchor.
- **Timing:** most micro-interactions 140–220ms; content transitions 260–420ms; spring only for small interactive elements, not for every panel.
- **Reduced motion:** remove large spatial movement, parallax, continuous loops and nonessential animated flourishes. Preserve state changes with short fades.

## 6. Implementation sequence

### Phase A — Foundation and shell
- Correct global root/background/font/control resets.
- Rebuild navigation layout with explicit desktop/tablet/mobile grid behavior.
- Remove the conflicting old editorial/glass treatment from the shell.
- Define reusable ink-border, shadow, surface, accent, pill-button and focus tokens.
- Confirm no horizontal overflow and no default browser control styling.

### Phase B — Home page composition
- Replace the entire previous comic hero and decorative mockup with the new cover panel and workflow storyboard.
- Recompose task panels, deadline/reference data and saved-scheme sections using one panel grammar.
- Preserve existing routes, data derivations, sources and tracker behavior.

### Phase C — Motion and accessibility
- Add intentional Motion choreography to hero, storyboard and section entrances.
- Ensure reduced-motion behavior and keyboard accessibility.
- Avoid perpetual motion and avoid layout-affecting animation.

### Phase D — Validation
- Run `npm run build`, `npm run typecheck` and `npm run lint` (fix issues introduced by this work; record unrelated existing warnings separately).
- Review layouts at 375, 768, 1024, 1440 and 1920 CSS-pixel widths.
- Verify navigation never wraps, controls remain dark and readable, focus is visible, and the page has no horizontal scroll.
- Confirm the existing scholarship deadline, local reference chart and tracker links still work.

## 7. Acceptance criteria

- The result is unmistakably comic neo-brutalist by its panel structure, inky outlines, flat dark surfaces, hard offset shadows, expressive type and limited print textures—not by adding cartoons/stickers to a generic dashboard.
- The overall impression remains professional, restrained and information-first.
- The navigation is a single, aligned row on desktop and a compact, usable drawer on mobile.
- All CTAs are pill-shaped and share consistent interaction states.
- No white default controls, white outer page areas, fallback serif UI text, overflow or accidental wrapping.
- Motion has a clear purpose, feels fluid, and respects reduced motion.
- No fake metrics, scholarship outcomes or misleading eligibility claims are introduced.
- Existing functional routes, language support, scholarship records and tracker behavior are preserved.
