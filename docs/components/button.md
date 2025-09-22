## Button

Accessible button component with variants and sizes.

### Import
```tsx
import { Button, buttonVariants } from "@/components/ui/button";
```

### Usage
```tsx
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Settings">
  <svg viewBox="0 0 24 24" />
  <span className="sr-only">Settings</span>
</Button>
```

### As child
Render as another element while preserving styles.
```tsx
<Button asChild>
  <a href="/settings">Go to settings</a>
<\/Button>
```

### API
- Props: all native `button` props plus:
  - `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" (default: "default")
  - `size`: "sm" | "default" | "lg" | "icon" (default: "default")
  - `asChild?`: boolean (default: false)

### Utility (optional)
Use `buttonVariants` to generate class names for custom elements.
```tsx
import { buttonVariants } from "@/components/ui/button";

<a className={buttonVariants({ variant: "outline", size: "lg" })}>Link</a>
```

