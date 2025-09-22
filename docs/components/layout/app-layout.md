## AppLayout

High-level layout component that renders a sidebar, top bar, and a rounded content area.

### Import
```tsx
import { AppLayout } from "@/components/layout/app-layout";
```

### Usage
```tsx
<AppLayout>
  <h1 className="text-xl font-semibold">Page Content</h1>
  <p>Your page goes here.</p>
</AppLayout>
```

### Behavior
- Uses the `Sidebar` system internally with `SidebarProvider`.
- Renders a sticky top bar with a `SidebarTrigger` and page title.
- The `children` render inside a bordered card.

### Props
- `children: React.ReactNode` (required)

