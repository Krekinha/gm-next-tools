## app/page.tsx

Página inicial que renderiza um layout de dashboard de exemplo usando os primitivos de `Sidebar`.

### Export
- `default`: `Page()`.

### Comportamento
- Envolve o conteúdo em `SidebarProvider` e usa `AppSidebar`.
- Renderiza um header com `SidebarTrigger` e um `Breadcrumb`.

### Uso
Roteada automaticamente como `/` pelo Next.js.

