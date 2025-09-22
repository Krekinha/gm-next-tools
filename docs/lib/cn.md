## cn

Utilitário para mesclar classes do Tailwind CSS com lógica condicional e resolução de conflitos.

### Importação
```ts
import { cn } from "@/lib/utils";
```

### Uso
```tsx
<div className={cn("px-4", isActive && "bg-primary", className)} />
```

### Descrição
- Encapsula `clsx` e `tailwind-merge` para combinar classes e desduplicar utilitários do Tailwind de forma inteligente.

### Assinatura
```ts
function cn(...inputs: ClassValue[]): string
```

