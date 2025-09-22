## Sidebar

Responsive, accessible sidebar system with desktop and mobile support.

### Import
```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
```

### Basic Example
```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <div className="p-2 font-semibold">Project</div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <a href="/">Dashboard</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Reports">
                <a href="/reports">Reports</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <div className="text-xs text-muted-foreground p-2">v1.0</div>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <header className="h-16 border-b flex items-center gap-2 px-4">
      <SidebarTrigger />
    </header>
    <main className="p-4">Content</main>
  </SidebarInset>
</SidebarProvider>
```

### Mobile behavior
- On mobile, the sidebar renders as a `Sheet` drawer automatically.
- Use `SidebarTrigger` to toggle state; keyboard shortcut: Ctrl/Cmd + `b`.

### API Highlights
- `SidebarProvider(props)`: context provider
  - `defaultOpen?: boolean` (default true)
  - `open?: boolean`, `onOpenChange?(open: boolean)` for controlled mode
  - Provides `useSidebar()` with `{ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }`
- `Sidebar(props)`: main container
  - `side?: "left" | "right"` (default "left")
  - `variant?: "sidebar" | "floating" | "inset"` (default "sidebar")
  - `collapsible?: "offcanvas" | "icon" | "none"` (default "offcanvas")
- Building blocks: `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup*`, `SidebarMenu*`, `SidebarRail`, `SidebarSeparator`, `SidebarInput`, `SidebarInset`, `SidebarTrigger`

