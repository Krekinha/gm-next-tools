## Sheet

Dialog-based sheet/drawer built on Radix Dialog.

### Import
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

### Usage
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
- `Sheet`: Radix provider root.
- `SheetTrigger`: trigger element (supports `asChild`).
- `SheetClose`: close button.
- `SheetContent`: drawer panel.
  - Props: all Radix `Content` props plus `side?: "top" | "right" | "bottom" | "left"` (default: "right").
- `SheetHeader`, `SheetFooter`: layout wrappers.
- `SheetTitle`, `SheetDescription`: accessible heading elements.

