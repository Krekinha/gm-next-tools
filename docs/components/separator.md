## Separator

Separador horizontal/vertical acessível baseado no Radix UI.

### Importação
```tsx
import { Separator } from "@/components/ui/separator";
```

### Uso
```tsx
<div className="space-y-4">
  <div>Section A</div>
  <Separator />
  <div>Section B</div>
</div>

<div className="flex items-center gap-4">
  <span>A</span>
  <Separator orientation="vertical" className="h-6" />
  <span>B</span>
</div>
```

### API
- Propriedades: todas as props do Radix `Separator.Root` mais:
  - `orientation`: "horizontal" | "vertical" (padrão: "horizontal")
  - `decorative`: booleano (padrão: true)

