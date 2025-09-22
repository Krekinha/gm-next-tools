## Tooltip

Componentes de tooltip baseados no Radix Tooltip.

### Importação
```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
```

### Uso
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <button className="px-2 py-1">Hover me</button>
  </TooltipTrigger>
  <TooltipContent>Helpful hint</TooltipContent>
</Tooltip>
```

### API
- `TooltipProvider`: provider de contexto (envolvido automaticamente por `Tooltip`).
- `Tooltip`: wrapper raiz.
- `TooltipTrigger`: elemento disparador; suporta `asChild`.
- `TooltipContent`: portal de conteúdo.
  - Propriedades: Radix `Content` mais `sideOffset?: number` (padrão: 0).

