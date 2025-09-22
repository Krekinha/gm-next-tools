## Sidebar

Sistema de sidebar responsivo e acessível com suporte a desktop e mobile.

### Importação
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

### Exemplo básico
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

### Comportamento no mobile
- No mobile, a sidebar é renderizada automaticamente como um drawer `Sheet`.
- Use `SidebarTrigger` para alternar o estado; atalho: Ctrl/Cmd + `b`.

### API — Destaques
- `SidebarProvider(props)`: provider de contexto
  - `defaultOpen?: boolean` (padrão: true)
  - `open?: boolean`, `onOpenChange?(open: boolean)` para modo controlado
  - Fornece `useSidebar()` com `{ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }`
- `Sidebar(props)`: contêiner principal
  - `side?: "left" | "right"` (padrão: "left")
  - `variant?: "sidebar" | "floating" | "inset"` (padrão: "sidebar")
  - `collapsible?: "offcanvas" | "icon" | "none"` (padrão: "offcanvas")
- Blocos de construção: `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup*`, `SidebarMenu*`, `SidebarRail`, `SidebarSeparator`, `SidebarInput`, `SidebarInset`, `SidebarTrigger`

