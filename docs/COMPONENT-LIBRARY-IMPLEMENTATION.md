# CampusPulse — BoldKit Neubrutalism design analysis and implementation

## Reference reviewed

- Live site: https://boldkit.dev/
- Documentation: https://boldkit.dev/docs
- Installation: https://boldkit.dev/docs/installation
- Theme Builder: https://boldkit.dev/themes
- Components: https://boldkit.dev/components
- Neubrutalism guide: https://boldkit.dev/neubrutalism
- Typography guide: https://boldkit.dev/neubrutalism/fonts
- Source repository: https://github.com/ANIBIT14/boldkit
- Source licence: MIT (`LICENSE`)

BoldKit is a React and Vue 3 neubrutalism component library built around shadcn conventions, Radix UI for React, Reka UI for Vue, Tailwind CSS v4, and TypeScript. Its published repository contains a component registry, theme presets, reusable section blocks, full-page templates, SVG shapes, chart components, and shared motion utilities.

This implementation follows the source's **default Coral theme** and its typography and component rules. CampusPulse remains a student-support product; its routes, scholarship information and workflows are retained rather than replacing the dashboard with BoldKit's marketing/docs homepage.

## 1. Visual language

BoldKit describes the style through five recurring traits:

1. Thick, high-contrast outlines — the source component primitives use 3px foreground borders as the standard treatment.
2. Hard, unblurred shadows — common elevation is 4px by 4px with no blur. The source also provides 2px, 6px, 8px, 12px and 16px variants, plus colored and layered double/triple shadows.
3. Flat, high-contrast color — surfaces stay opaque; Coral, Teal and Yellow define the hierarchy.
4. Raw, oversized typography — display text is uppercase, condensed and deliberately much larger than body copy.
5. Square corners — the default radius is `0rem`; round stamps and avatar elements remain exceptions when their role calls for them.

The homepage adds a newspaper/editorial composition: a compact navigation header, a five-color top stripe, grid-paper hero, large display masthead with a ruled divider and outlined text, framed preview panels, and compact mono labels. The Dashboard template extends the same rules to a dark vertical navigation rail, 3px separators, KPI cards, hard-shadow charts and square data tables.

## 2. Canonical default Coral palette

Values below come from `registry/default/styles/globals.css`, `public/r/theme.json`, and `src/config/theme-presets.ts`. The initial/default theme is Coral; the source also offers Purple, Forest, Ocean, Sunset, Mono, Neon, Electric, Candy, Cyberpunk, Retro, Pastel, Gold and Cherry.

| Token | HSL channels | Purpose |
|---|---|---|
| Background | `60 9% 98%` | Warm off-white page canvas |
| Foreground | `240 10% 10%` | Near-black ink / primary text |
| Card / Popover | `0 0% 100%` | White content surfaces |
| Primary | `0 84% 71%` | Coral action and primary emphasis |
| Primary foreground | `240 10% 10%` | Ink on coral |
| Secondary | `174 62% 56%` | Teal secondary action |
| Accent | `49 100% 71%` | Yellow highlight / selected state |
| Muted | `60 5% 90%` | Neutral panel and hover surface |
| Muted foreground | `240 5% 38%` | Secondary text |
| Destructive | `0 84% 47%` | Error/destructive status |
| Success | `152 69% 69%` | Positive status |
| Warning | `49 100% 60%` | Warning status |
| Info | `212 100% 73%` | Informational status |
| Border / Ring | `240 10% 10%` | Strong near-black outlines |
| Radius | `0rem` | Square edges |
| Shadow color | `240 10% 10%` | Hard shadow ink |
| Shadow offset | `4px` | Default hard-shadow offset |
| Border width | `3px` | Default component outline |

Chart palette: Coral `0 84% 71%`, Teal `174 62% 56%`, Yellow `49 100% 71%`, Purple `271 76% 53%`, Pink `326 78% 60%`. Neon and clash colors are retained as optional tokens, not applied indiscriminately to student pages.

## 3. Typography system

BoldKit's font guide and website source identify a three-font role system:

| Role | Font | Implementation |
|---|---|---|
| Display / large page headings | **Bebas Neue** | Large uppercase editorial headings and outlined hero text |
| Body / UI | **Outfit** | Paragraphs, navigation, card copy, form labels and controls |
| Mono / technical labels | **DM Mono** | Eyebrows, uppercase metadata, small indices and code-like details |

The font guide recommends one expressive display face, one restrained body face, and a mono accent — not multiple competing display fonts. BoldKit's CSS typography helpers include display sizes of 4rem, 6rem and 8rem, line-heights 1, 0.9 and 0.85 and tight tracking. The homepage hero uses a responsive 72px-to-200px masthead with compressed line-height; small uppercase mono labels commonly sit around 9–11px with wide tracking.

CampusPulse uses that hierarchy selectively: Bebas Neue for dashboard and page section headings, Outfit for readable student content, and DM Mono for metadata. Long-form student information remains readable rather than making every paragraph decorative.

## 4. Component construction and interaction

### Buttons

The source Button supports default, secondary, accent, destructive, outline, ghost, link, no-shadow and reverse variants. Standard buttons use a 3px solid foreground border, square corners, a 4px by 4px hard foreground shadow, uppercase bold tracked text, and hover/press movement of +4px in both axes with the shadow removed. Size options include small, default, large, extra-large and icon.

CampusPulse maps its existing `Button` API to the same visual semantics so existing pages keep their prop usage. It adds Accent and Link variants and an XL size without changing current behaviour.

### Cards and data surfaces

BoldKit Card uses a 3px border and 4px hard shadow. Its optional interactive mode moves +4px in both axes while the shadow disappears. CampusPulse applies the same treatment to scholarship cards, dashboard task links, planner panels, form cards, dialogs and component-gallery surfaces.

### Motion

The source's shared snap motion uses a 150ms transition and `cubic-bezier(0.22, 1, 0.3, 1.12)`. Its motion layer also defines stepped, stamp and rubber easings. CampusPulse uses the shared snap values for button/card interactions and a global `prefers-reduced-motion` guard. The intent is crisp tactile movement, not glow or blurred elevation.

### Decorative language

The source includes grid-paper backgrounds, stickers, stamps, dashed borders, double borders and layered shadows. CampusPulse uses restrained grid-paper treatment in the dashboard masthead and adds compatible `bk-*` utility recipes; it does not add random shapes to scholarship tables or document forms.

## 5. Installation guidance and CampusPulse architecture

BoldKit's React quick start documents:

```bash
npx shadcn@latest init https://boldkit.dev/r/boldkit.json
```

It then asks React projects to register this alias in `components.json`:

```json
{
  "registries": {
    "@boldkit": "https://boldkit.dev/r/{name}.json"
  }
}
```

Individual components are added with `npx shadcn@latest add @boldkit/button`; styles and theme presets are also available through the registry. CampusPulse now contains the `@boldkit` registry alias and matching shadcn configuration. The theme is translated into the existing CSS variables and component APIs rather than running the initializer over an established application stylesheet.

This avoids replacing CampusPulse routing, Supabase integration, local storage and student workflows with a generic component-library starter. Existing components remain the implementation layer, but their visual contracts follow the source's border, shadow, typography and interaction rules.

## 6. CampusPulse integration

- Warm off-white app canvas and white content surfaces.
- Coral primary actions, Teal secondary actions, Yellow accent and selected states.
- Near-black 3px borders, square corners and hard 4px shadows, with larger shadow helpers for key panels.
- Compact navigation with a five-color stripe and coral active indicator.
- Editorial dashboard masthead uses grid paper, thick accent rule, Bebas Neue display type and outlined second line while retaining CampusPulse's student-support message.
- Outfit supports paragraph readability; DM Mono differentiates metadata and labels.
- Scholarship catalogue, scheme details, eligibility checker, services, saved tracker, reminders, document review, rejection help and profile flows remain.
- Existing privacy notices, document-size validation, official-source caveats and local-storage behaviour are unchanged.
- Component gallery remains available at `/component-library` and now describes the BoldKit system.

## 7. Source files inspected

- `README.md` — project identity, installation, component inventory and theme setup.
- `index.html` — website font pairing and browser theme color.
- `src/styles/globals.css` — component borders, shadows, typography helpers, utility recipes and motion tokens.
- `registry/default/styles/globals.css` — canonical default theme variables and shared styling.
- `public/r/theme.json` — installable default theme registry item.
- `src/config/theme-presets.ts` — Coral default and other theme presets.
- `src/components/ui/button.tsx` — Button variants, sizes and press behaviour.
- `src/components/ui/card.tsx` — Card structure and interactive hover behaviour.
- `src/components/layout/Header.tsx` — header, navigation, palette stripe and mobile menu.
- `src/pages/Home.tsx` — editorial masthead, grid hero and component preview composition.
- `src/components/templates/DashboardTemplate.tsx` — application dashboard layout and table/chart patterns.
- `src/pages/seo/NeubrutalismFonts.tsx` — font pairing advice.

## 8. Validation

Automated validation should run with `npm run lint`, `npm run typecheck` and `npm run build`. Review CI and desktop/mobile browser rendering before merging. A successful compile alone is not proof of visual browser QA.
