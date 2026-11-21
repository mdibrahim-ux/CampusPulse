# Neobrutalism.dev reference analysis and CampusPulse implementation

## Reference inspected

- Site: https://www.neobrutalism.dev/
- Installation guide: https://www.neobrutalism.dev/docs/installation
- Styling guide: https://www.neobrutalism.dev/docs/styling
- Reference source: https://github.com/ekmas/neobrutalism-components

The reference is a React/Tailwind component library built around the Neobrutalism visual language. Its installation flow separates the styling token setup from individual component installation. It documents CSS-variable-based styling as the current approach; a project can install its preferred style preset, then add source components using the CLI or by copying component files. The current reference also documents its own component APIs rather than promising full compatibility with the default shadcn components.

## Visual system identified from the reference source

CampusPulse follows the reference's default **Monochromatic / Blue** preset.

| Design token | Reference value | Applied use |
|---|---|---|
| Page background | `hsl(214, 95%, 93%)` | Main app canvas |
| Card background | `oklch(100% 0 0)` | Cards, dialogs and content panels |
| Primary | `hsl(217, 100%, 66%)` | Main buttons, active nav and key states |
| Foreground | `oklch(0% 0 0)` | Body and heading text |
| Border | `oklch(0% 0 0)` | Strong black component outlines |
| Shadow | `4px 4px 0 0 var(--border)` | Hard, unblurred offset shadow |
| Corner radius | `5px` | Common control and card radius |
| Heading weight | `700` | Headings |
| Body weight | `500` | Paragraphs and controls |
| Default font | DM Sans | All application typography |

The reference's default Blue chart palette is: `#5294FF`, `#FF4D50`, `#FACC00`, `#05E17A`, `#7A83FF`. CampusPulse uses these for demo chart series only; those values are not interpreted as product metrics.

## Component styling rules observed

1. Thick, high-contrast 2px black outlines define the shape.
2. Surfaces are solid and opaque; shadows are offset hard edges, not blurred elevation.
3. Cards and controls use compact 5px corners rather than pill or glass surfaces.
4. The main button is a filled palette colour with black text and a black hard shadow. Its hover response translates the button into its shadow, removing the shadow to create a pressed tactile effect.
5. Neutral buttons use white surfaces with black outlines and the same hard shadow. Reverse buttons use the opposite translation direction.
6. Typography is direct and geometric: DM Sans, 700-weight headings, 500-weight body, clear hierarchy and compact labels.
7. State and interaction components keep the same outline, surface and palette language; visual feedback should not require gradients or glow.

## CampusPulse adaptation

This is a design-system translation, not a clone of the reference site's marketing page. CampusPulse keeps its student-support information architecture, existing content, scheme records, verified-date caveats, local reminders, profile data and document-review API. Its own labels and task flows remain in place.

The current CampusPulse codebase is CSS-first and does not use the reference site's Tailwind/Base UI implementation throughout. The design tokens and interaction rules have therefore been translated into the existing `--cp-*` variables and native project components rather than forcing a wholesale framework or routing migration.

### Re-themed surfaces

- The global page background and browser theme colour use the reference light Blue preset.
- Navigation, overview hero, quick links, scheme/service cards, forms, reminder panels and component previews now use pale-blue/white surfaces with black borders and hard shadows.
- Existing primary actions use the reference blue; the old charcoal/coral/cobalt palette is no longer the app's global theme.
- App typography uses Next Font's DM Sans family with the same available weight range used by the reference.
- The existing circular avatar treatment is retained where it serves an identity purpose; the shared cards, controls, menus and action surfaces use the reference's compact geometry.

### Product workflows preserved

- Document review still posts to the existing analysis endpoint and keeps the existing consent, redaction, file-size and privacy messaging.
- Planner reminders still use the existing `Reminder` type and browser-local storage functions. The date picker/calendar are visual and input upgrades, not a claim that deadline notifications or provider sync have been added.
- Profile data remains local to the existing browser storage.
- The component gallery still labels its charts as demonstration data, not scholarship statistics.

## Component catalogue

The library consolidates the supplied repeated examples into reusable implementations: attachment/upload, avatar, button/button groups, card, checkbox, radio group, switch, slider, field/form wrappers, calendar/date picker, progress, skeleton, spinner, empty state, dropdown, command, context menu, menubar, navigation menu, dialog, drawer, popover, hover card, collapsible, carousel, questionnaire, charts, tables, pagination, sidebar and image card.

## Source files consulted

- `public/r/styling/blue.json` — canonical default Blue preset values.
- `src/styling/globals.css` — reference CSS variables, theme weights, radius and shadows.
- `src/data/colors.ts` — available color presets and default mode/name.
- `src/data/fonts.ts` and `src/lib/google-fonts.ts` — default DM Sans font and weight options.
- `src/components/ui/button.tsx` — button variants, sizes, borders, shadows and hover motion.
- `src/app/styling/styling.tsx` — theme customization and generated CSS installation flow.

## Validation

The branch should be checked with the repository's production build and browser testing after this commit. The component preview is available at `/component-library`; the main product landing/dashboard remains at `/dashboard`.
