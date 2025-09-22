## Separator

Accessible horizontal/vertical separator based on Radix UI.

### Import
```tsx
import { Separator } from "@/components/ui/separator";
```

### Usage
```tsx
<div className="space-y-4">
  <div>Section A</div>
  <Separator />
  <div>Section B</div>
</div>

<div className="flex items-center gap-4">
  <span>A</span>
  <Separator orientation="vertical" className="h-6" />
  <span>B</span>
</div>
```

### API
- Props: all Radix `Separator.Root` props plus:
  - `orientation`: "horizontal" | "vertical" (default: "horizontal")
  - `decorative`: boolean (default: true)

