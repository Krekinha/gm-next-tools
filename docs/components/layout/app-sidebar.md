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
- Exibe o título do projeto e versão no header.
- Grupos de menu de exemplo; substitua pelos itens da sua navegação.

