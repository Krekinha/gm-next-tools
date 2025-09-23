# cn

> Utilitário para combinar classes CSS do Tailwind com lógica condicional e resolução inteligente de conflitos

## 📋 Visão Geral

A função `cn` é um utilitário essencial que combina `clsx` e `tailwind-merge` para mesclar classes CSS de forma inteligente, resolvendo conflitos entre utilitários do Tailwind CSS.

## 🎯 Características

- **Inteligente**: Resolve conflitos entre classes do Tailwind automaticamente
- **Condicional**: Suporte a lógica condicional para classes
- **TypeScript**: Tipagem completa com `ClassValue`
- **Performance**: Otimizado para uso frequente

## 🚀 Uso

```tsx
import { cn } from '@/lib/utils'

// Uso básico
<div className={cn('px-4 py-2', 'bg-blue-500')} />

// Com lógica condicional
<div className={cn(
  'px-4 py-2',
  isActive && 'bg-primary text-primary-foreground',
  isDisabled && 'opacity-50 cursor-not-allowed',
  className
)} />

// Resolução de conflitos
<div className={cn('px-4 px-8')} /> // Resultado: 'px-8'
```

## 🔧 API

### Função

```tsx
function cn(...inputs: ClassValue[]): string
```

### Parâmetros

- **`inputs`**: Array de valores de classe (`ClassValue[]`)
  - `string`: Classes CSS
  - `boolean`: Classes condicionais
  - `object`: Classes com chaves booleanas
  - `undefined/null`: Ignorados

### Retorno

- **`string`**: Classes CSS mescladas e otimizadas

## 🏗️ Implementação

### Dependências

```tsx
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Fluxo

1. **clsx**: Combina valores de classe com lógica condicional
2. **twMerge**: Resolve conflitos entre utilitários do Tailwind
3. **Retorno**: String otimizada com classes válidas

## 🎨 Exemplos Práticos

### Componente com Variantes

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Button({ variant = 'primary', size = 'md', className }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'px-4 py-2 rounded-md font-medium transition-colors',
        
        // Variants
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
        },
        
        // Sizes
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        
        // Custom classes
        className
      )}
    >
      Button
    </button>
  )
}
```

### Estados Condicionais

```tsx
export function Card({ isActive, isDisabled, className }: CardProps) {
  return (
    <div
      className={cn(
        'p-4 border rounded-lg transition-all',
        
        // Estados
        isActive && 'border-primary bg-primary/5',
        isDisabled && 'opacity-50 cursor-not-allowed',
        
        // Hover effects
        !isDisabled && 'hover:shadow-md',
        
        className
      )}
    >
      Content
    </div>
  )
}
```

## 🧪 Testes

### Cenários de Teste

1. **Combinação básica**: Classes simples se combinam
2. **Conflitos**: Classes conflitantes são resolvidas
3. **Condicionais**: Lógica booleana funciona
4. **Objetos**: Classes com chaves booleanas
5. **Valores falsy**: `undefined`, `null`, `false` são ignorados

### Exemplo de Teste

```tsx
import { cn } from '@/lib/utils'

test('combines classes correctly', () => {
  expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  expect(cn('px-4', 'px-8')).toBe('px-8')
  expect(cn('px-4', true && 'py-2')).toBe('px-4 py-2')
  expect(cn('px-4', false && 'py-2')).toBe('px-4')
})
```

## 🔗 Dependências

- **`clsx`**: Combinação de classes com lógica condicional
- **`tailwind-merge`**: Resolução de conflitos do Tailwind CSS

## 📝 Notas de Desenvolvimento

### Decisões Técnicas

- **twMerge**: Resolve conflitos automaticamente (ex: `px-4 px-8` → `px-8`)
- **clsx**: Suporte robusto a lógica condicional
- **ClassValue**: Tipo flexível para diferentes formatos

### Casos de Uso

- **Componentes**: Variantes e estados condicionais
- **Layouts**: Classes responsivas e condicionais
- **Themes**: Classes baseadas no tema atual
- **Props**: Classes customizadas via props

### Melhorias Futuras

- [ ] Cache de resultados para performance
- [ ] Suporte a CSS-in-JS
- [ ] Validação de classes do Tailwind
- [ ] Debug mode para desenvolvimento

---

**Versão**: 1.0  
**Última Atualização**: Dezembro 2024  
**Responsável**: Equipe GM Tools

