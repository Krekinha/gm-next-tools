# Utils - Utilitários Gerais

Utilitários gerais para manipulação de classes CSS e outras funções auxiliares.

## 📋 Visão Geral

O arquivo `lib/utils.ts` contém utilitários essenciais para a aplicação, principalmente para manipulação de classes CSS com Tailwind CSS usando `clsx` e `tailwind-merge`.

## 🎯 Funcionalidades

- **Combinação de Classes**: Merge inteligente de classes Tailwind
- **Condicionais**: Suporte a classes condicionais
- **Deduplicação**: Remove classes conflitantes automaticamente
- **TypeScript**: Tipagem completa para segurança

## 📦 Importação

```tsx
import { cn } from '@/lib/utils'
```

## 🚀 Função Principal

### cn (Class Names)

Função utilitária para combinar classes CSS de forma inteligente.

```tsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### Parâmetros
```typescript
interface ClassValue {
  // Aceita strings, objetos, arrays, etc.
  // Compatível com clsx
}
```

#### Retorno
```typescript
string // Classes CSS combinadas e otimizadas
```

## 🚀 Exemplos de Uso

### Uso Básico
```tsx
import { cn } from '@/lib/utils'

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md',
        className
      )}
      {...props}
    />
  )
}
```

### Classes Condicionais
```tsx
import { cn } from '@/lib/utils'

export function Card({ isActive, className, children }) {
  return (
    <div
      className={cn(
        'p-4 border rounded-lg',
        isActive && 'border-blue-500 bg-blue-50',
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Múltiplas Condições
```tsx
import { cn } from '@/lib/utils'

export function Alert({ variant, size, className, children }) {
  return (
    <div
      className={cn(
        'rounded-md font-medium',
        {
          'bg-red-100 text-red-800': variant === 'error',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-yellow-100 text-yellow-800': variant === 'warning',
        },
        {
          'px-3 py-2 text-sm': size === 'sm',
          'px-4 py-3 text-base': size === 'md',
          'px-6 py-4 text-lg': size === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Com Variantes
```tsx
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

### Arrays e Objetos
```tsx
import { cn } from '@/lib/utils'

export function Container({ className, children }) {
  return (
    <div
      className={cn([
        'mx-auto',
        'max-w-7xl',
        'px-4',
        'sm:px-6',
        'lg:px-8',
      ], {
        'bg-white': true,
        'shadow-lg': true,
      }, className)}
    >
      {children}
    </div>
  )
}
```

## 🏗️ Implementação Interna

### Dependências
```tsx
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
```

### Como Funciona
1. **clsx**: Combina classes CSS de diferentes formatos
2. **twMerge**: Remove classes conflitantes do Tailwind
3. **Resultado**: Classes otimizadas e sem conflitos

### Exemplo de Merge
```tsx
// Input
cn('px-4 py-2', 'px-6', 'bg-blue-500')

// Output
'py-2 px-6 bg-blue-500'
// Note: px-4 foi removido porque px-6 tem precedência
```

## 🎯 Casos de Uso Comuns

### Componentes com Props
```tsx
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
}

export function Card({ className, children, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-6',
        {
          'bg-white border': variant === 'default',
          'border-2 border-gray-200': variant === 'outlined',
          'bg-white shadow-lg': variant === 'elevated',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Estados de Loading
```tsx
import { cn } from '@/lib/utils'

export function LoadingButton({ loading, children, ...props }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md',
        loading && 'opacity-50 cursor-not-allowed',
        props.className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}
```

### Responsividade
```tsx
import { cn } from '@/lib/utils'

export function ResponsiveGrid({ className, children }) {
  return (
    <div
      className={cn(
        'grid gap-4',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3',
        'lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Dark Mode
```tsx
import { cn } from '@/lib/utils'

export function ThemedCard({ className, children }) {
  return (
    <div
      className={cn(
        'rounded-lg p-6',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-gray-100',
        'border border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  )
}
```

## 🔧 Tipos TypeScript

### ClassValue
```typescript
type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | ClassValue[] 
  | { [key: string]: any }
```

### Uso com Interfaces
```typescript
interface ComponentProps {
  className?: string
  // outras props...
}

export function Component({ className, ...props }: ComponentProps) {
  return (
    <div className={cn('base-classes', className)} {...props} />
  )
}
```

## 🚀 Exemplos Avançados

### Hook Personalizado
```tsx
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function useToggleClasses(baseClasses: string) {
  const [isActive, setIsActive] = useState(false)
  
  const toggleClasses = cn(
    baseClasses,
    isActive && 'active-classes'
  )
  
  return {
    className: toggleClasses,
    isActive,
    toggle: () => setIsActive(!isActive),
  }
}
```

### Componente com Variantes
```tsx
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        secondary: 'bg-blue-100 text-blue-800',
        destructive: 'bg-red-100 text-red-800',
        success: 'bg-green-100 text-green-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'success'
  className?: string
  children: React.ReactNode
}

export function Badge({ variant, className, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  )
}
```

## 🔮 Melhorias Futuras

- [ ] **Mais Utilitários**: Funções para formatação, validação, etc.
- [ ] **Performance**: Otimizações para grandes listas de classes
- [ ] **Debug**: Modo de debug para desenvolvimento
- [ ] **Plugins**: Suporte a plugins customizados

## 🧪 Testes

### Cenários de Teste
1. **Classes Simples**: Combinação de strings
2. **Classes Condicionais**: Objetos com booleanos
3. **Arrays**: Listas de classes
4. **Conflitos**: Remoção de classes conflitantes
5. **Undefined/Null**: Tratamento de valores nulos

### Exemplo de Teste
```tsx
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('should combine classes correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('should handle conditional classes', () => {
    expect(cn('base', { 'active': true, 'disabled': false })).toBe('base active')
  })

  it('should merge conflicting classes', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })
})
```

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: clsx, tailwind-merge
