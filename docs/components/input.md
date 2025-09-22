## Input

Campo de texto estilizado com estados de foco e validação.

### Importação
```tsx
import { Input } from "@/components/ui/input";
```

### Uso
```tsx
<label className="grid gap-2">
  <span>Email</span>
  <Input type="email" placeholder="you@example.com" />
</label>

<Input aria-invalid placeholder="Invalid state" />
```

### API
- Propriedades: todas as props nativas de `input`.

