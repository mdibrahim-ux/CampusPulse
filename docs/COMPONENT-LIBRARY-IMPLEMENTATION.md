# CampusPulse design system — RetroUI adaptation

## Reference inspected

- Repository: https://github.com/neobrutalism/neobrutalism
- Project name in its README/package metadata: **RetroUI**
- Documentation: https://retroui.dev/docs
- Source license: MIT (see the upstream `LICENCE.md`)

This reference is distinct from neobrutalism.dev and its Monochromatic Blue preset. The repository's own README identifies it as a retro-styled Tailwind CSS component library for modern apps.

## Canonical theme tokens

The values below are translated from the upstream `registry.json` `retroui-theme` entry:

| Token | Upstream value | CampusPulse use |
|---|---|---|
| Background | `0 0% 100%` | White application canvas |
| Foreground | `0 0% 0%` | Black text |
| Card | `0 0% 100%` | White cards and overlays |
| Primary | `50 100% 60%` | Warm yellow primary action |
| Primary foreground | `0 0% 0%` | Black text on yellow |
| Muted | `0 0% 68%` | Muted surfaces |
| Muted foreground | `0 0% 35%` | Secondary text |
| Accent | `50 89% 74%` | Pale warm yellow for hover/secondary highlight |
| Destructive | `355 78% 56%` | Destructive states |
| Border | `0 0% 0%` | High-contrast black outlines |

The registry defines hard shadow sizes as follows:

| Shadow token | Value |
|---|---|
| xs | `1px 1px 0 0 var(--border)` |
| sm | `2px 2px 0 0 var(--border)` |
| default | `3px 3px 0 0 var(--border)` |
| md | `4px 4px 0 0 var(--border)` |
| lg | `6px 6px 0 0 var(--border)` |
| xl | `10px 10px 0 1px var(--border)` |
| 2xl | `16px 16px 0 1px var(--border)` |

CampusPulse uses 5px corners, black borders and zero-blur shadows. The primary button follows a tactile press interaction: it shifts 4px down/right and the hard shadow disappears. Reduced-motion preferences are respected.

## Upstream architecture and component approach

The upstream repository currently uses Next.js 16, React 19, Tailwind CSS v4, shadcn registry metadata and Base UI components, with Motion and Recharts for selected interactions/visualizations. Its `registry.json` describes a broad component set, including buttons, cards, inputs, labels, menus, popovers, progress, radio, select, slider, switch, tabs, tables, text, textarea, tooltips, and chart components.

CampusPulse remains on its existing Next.js/React/CSS-first implementation. We have translated the visual system into existing CampusPulse CSS tokens and UI components instead of migrating routing, replacing existing dependencies, or importing the unrelated RetroUI docs website.

## CampusPulse integration

- The global surface is white; primary actions and selected states use the registry yellow.
- Neutral surfaces remain white with black outlines; pale yellow is used as a supporting highlight.
- Reusable buttons, cards, inputs, selects, checkboxes, radios, switches, tabs, tables, dialogs, menus, progress indicators and component-gallery examples follow the same RetroUI visual language.
- Hard-shadow sizes are exposed as CSS custom properties for consistent component elevation.
- Existing navigation, scholarship catalogue, scheme detail pages, eligibility checker, document-review endpoint and privacy safeguards, reminders, and profile flows remain in place.
- The existing component gallery remains available at `/component-library`.

## Source files inspected

- `README.md` — library identity and documentation link.
- `package.json` — source stack, scripts and dependencies.
- `components.json` — shadcn registry setup and aliases.
- `registry.json` — canonical RetroUI theme values and component registry.
- `LICENCE.md` — MIT license.
- `components/retroui/*` entries referenced by the component registry.

## Validation

The code change should be verified using `npm run build`, `npm run lint`, and browser checks at desktop and mobile widths. No claim is made that the upstream package itself has been installed wholesale; the existing CampusPulse component APIs are retained.
