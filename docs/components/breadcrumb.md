## Breadcrumb

Composable breadcrumb navigation components.

### Import
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

### Usage
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
- `Breadcrumb`: wrapper `nav` with `aria-label="breadcrumb"`.
- `BreadcrumbList`: ordered list container.
- `BreadcrumbItem`: list item.
- `BreadcrumbLink`: anchor/link; accepts `asChild?`.
- `BreadcrumbPage`: current page span with `aria-current="page"`.
- `BreadcrumbSeparator`: custom or default chevron.
- `BreadcrumbEllipsis`: collapsed items indicator.

