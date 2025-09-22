## useIsMobile

Detecta se a largura da viewport está abaixo do breakpoint mobile.

### Importação
```tsx
import { useIsMobile } from "@/hooks/use-mobile";
```

### Uso
```tsx
"use client"

import { useIsMobile } from "@/hooks/use-mobile";

export default function Example() {
  const isMobile = useIsMobile();
  return <div>Mobile? {isMobile ? "Yes" : "No"}</div>;
}
```

### Comportamento
- Usa `window.matchMedia` para avaliar `(max-width: 767px)`.
- Retorna um booleano, iniciando como `false` até o primeiro efeito rodar.
- Atualiza via listener em mudanças de viewport.

