## Tooltip

Tooltip components built on Radix Tooltip.

### Import
```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
```

### Usage
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <button className="px-2 py-1">Hover me</button>
  </TooltipTrigger>
  <TooltipContent>Helpful hint</TooltipContent>
</Tooltip>
```

### API
- `TooltipProvider`: context provider (auto-wrapped in `Tooltip`).
- `Tooltip`: root wrapper.
- `TooltipTrigger`: trigger element; supports `asChild`.
- `TooltipContent`: content portal.
  - Props: Radix `Content` plus `sideOffset?: number` (default: 0).

