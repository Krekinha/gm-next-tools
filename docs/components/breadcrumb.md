## Breadcrumb

Componentes de navegação breadcrumb (trilha) componíveis.

### Importação
```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
```

### Uso
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>API</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
<\/Breadcrumb>
```

### API
- `Breadcrumb`: `nav` com `aria-label="breadcrumb"`.
- `BreadcrumbList`: container `ol` da lista.
- `BreadcrumbItem`: item da lista.
- `BreadcrumbLink`: link âncora; aceita `asChild?`.
- `BreadcrumbPage`: página atual com `aria-current="page"`.
- `BreadcrumbSeparator`: separador padrão (seta) ou customizado via `children`.
- `BreadcrumbEllipsis`: indicador de itens colapsados.

