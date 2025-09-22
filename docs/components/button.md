## Button

Componente de botão acessível com variantes e tamanhos.

### Importação
```tsx
import { Button, buttonVariants } from "@/components/ui/button";
```

### Uso
```tsx
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Settings">
  <svg viewBox="0 0 24 24" />
  <span className="sr-only">Settings</span>
</Button>
```

### Como `asChild`
Renderize como outro elemento mantendo os estilos.
```tsx
<Button asChild>
  <a href="/settings">Go to settings</a>
<\/Button>
```

### API
- Propriedades: todas as props nativas de `button` mais:
  - `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" (padrão: "default")
  - `size`: "sm" | "default" | "lg" | "icon" (padrão: "default")
  - `asChild?`: booleano (padrão: false)

### Utilitário (opcional)
Use `buttonVariants` para gerar classes em elementos personalizados.
```tsx
import { buttonVariants } from "@/components/ui/button";

<a className={buttonVariants({ variant: "outline", size: "lg" })}>Link</a>
```

