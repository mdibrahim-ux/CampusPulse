# CampusPulse UI components

Project-native React components styled for CampusPulse's dark neo-brutalist design system.

The supplied snippets included repeated demonstrations of the same primitives. They have been consolidated into reusable compound components instead of copied as duplicate pages. The implementations use the repository's Next.js / React stack, Framer Motion, Lucide and Recharts. They do not require Radix UI, Base UI or the shadcn registry.

## Component families

### Actions and layout
- `Button`, `ButtonGroup`
- `Card`
- `Avatar`
- `Attachment`, `AttachmentUpload`
- `Empty`, `Skeleton`, `Spinner`

### Inputs and forms
- `Checkbox`, `RadioGroup`, `RadioGroupItem`, `Switch`, `Slider`
- `Field`, `FieldGroup`, `Form`, `FormField`, `FormItem`, `FormControl`, `FormLabel`, `FormDescription`, `FormMessage`
- `DatePicker`, `Calendar`, `Progress`

### Menus and overlays
- `DropdownMenu` and subcomponents
- `Dialog`, `Drawer`, `Popover`, `HoverCard`
- `Command` and `CommandDialog`
- `ContextMenu`, `Menubar`, `NavigationMenu`
- `Collapsible`

### Data and navigation
- `Carousel`
- `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`
- `Table` and table primitives
- `Pagination`
- `Sidebar` and layout primitives
- `Questionnaire` and step controls
- `ImageCard`

## Usage

Import a component from its matching file:

```tsx
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
} from '@/components/ui/attachment';
```

Or use the barrel export:

```tsx
import { Button, Card, DatePicker } from '@/components/ui';
```

## Application integrations

- `/document-review`: drag/drop picker and attachment state row; preserves the existing upload API, 8 MB check, consent and privacy notices.
- `/planner`: date picker, inline calendar and completion progress; reminders still use the existing local storage.
- `/profile`: avatar fallback and profile completion progress; profile data remains local to the browser.
- `/component-library`: interactive component preview gallery.

The component gallery contains demonstration content. Chart values shown there are sample values only, not real scholarship statistics or student outcomes.
