## AppLayout

Componente de layout de alto nível que renderiza uma sidebar, top bar e uma área de conteúdo arredondada.

### Importação
```tsx
import { AppLayout } from "@/components/layout/app-layout";
```

### Uso
```tsx
<AppLayout>
  <h1 className="text-xl font-semibold">Page Content</h1>
  <p>Your page goes here.</p>
</AppLayout>
```

### Comportamento
- Usa o sistema `Sidebar` internamente com `SidebarProvider`.
- Renderiza uma top bar fixa com `SidebarTrigger` e título.
- `children` é renderizado dentro de um card com borda.

### Props
- `children: React.ReactNode` (obrigatório)

