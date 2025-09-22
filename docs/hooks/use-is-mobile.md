## useIsMobile

Detects whether the viewport width is under the mobile breakpoint.

### Import
```tsx
import { useIsMobile } from "@/hooks/use-mobile";
```

### Usage
```tsx
"use client"

import { useIsMobile } from "@/hooks/use-mobile";

export default function Example() {
  const isMobile = useIsMobile();
  return <div>Mobile? {isMobile ? "Yes" : "No"}</div>;
}
```

### Behavior
- Uses `window.matchMedia` to evaluate `(max-width: 767px)`.
- Returns a boolean, defaulting to `false` until the first effect runs.
- Listener updates on viewport changes.

