## Sheet

Sheet/Drawer baseado em diálogo (Radix Dialog).

### Importação
```tsx
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
```

### Uso
```tsx
<Sheet>
  <SheetTrigger asChild>
    <button>Open sheet</button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Manage your preferences</SheetDescription>
    </SheetHeader>
    <div className="p-4">Content...</div>
    <SheetFooter>
      <SheetClose className="mt-2">Close</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### API
- `Sheet`: root provider do Radix.
- `SheetTrigger`: elemento de disparo (suporta `asChild`).
- `SheetClose`: botão de fechar.
- `SheetContent`: painel do drawer.
  - Propriedades: todas as props do Radix `Content` mais `side?: "top" | "right" | "bottom" | "left"` (padrão: "right").
- `SheetHeader`, `SheetFooter`: contêineres de layout.
- `SheetTitle`, `SheetDescription`: elementos acessíveis de título e descrição.

