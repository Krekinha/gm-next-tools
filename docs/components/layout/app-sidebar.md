## AppSidebar

Navegação de sidebar opinativa construída sobre os primitivos de `Sidebar` com seções de exemplo.

### Importação
```tsx
import { AppSidebar } from "@/components/layout/app-sidebar";
```

### Uso
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

### Notas
- Exibe a logo e nome do app "GMTools" com versão no header.
- Link da logo aponta para a página root (/) que contém o dashboard.
- Grupos de menu organizados por categoria (Dashboard, Documentos, Relatórios).
- Renderização condicional do SidebarGroupLabel baseada no groupTitle.

