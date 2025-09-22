## cn

Utility to merge Tailwind CSS class names with conditional logic and conflict resolution.

### Import
```ts
import { cn } from "@/lib/utils";
```

### Usage
```tsx
<div className={cn("px-4", isActive && "bg-primary", className)} />
```

### Description
- Wraps `clsx` and `tailwind-merge` to combine classes and intelligently dedupe Tailwind utilities.

### Signature
```ts
function cn(...inputs: ClassValue[]): string
```

