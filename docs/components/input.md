## Input

Styled text input with focus and validation states.

### Import
```tsx
import { Input } from "@/components/ui/input";
```

### Usage
```tsx
<label className="grid gap-2">
  <span>Email</span>
  <Input type="email" placeholder="you@example.com" />
</label>

<Input aria-invalid placeholder="Invalid state" />
```

### API
- Props: all native `input` props.

