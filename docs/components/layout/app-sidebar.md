## AppSidebar

Opinionated sidebar navigation built on the `Sidebar` primitives with example sections.

### Import
```tsx
import { AppSidebar } from "@/components/layout/app-sidebar";
```

### Usage
```tsx
<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <header className="h-16 border-b flex items-center gap-2 px-4">
      <SidebarTrigger />
    </header>
    <main className="p-4">Content</main>
  </SidebarInset>
</SidebarProvider>
```

### Notes
- Displays project title and version in the header.
- Example menu groups provided; replace with your navigation items.

