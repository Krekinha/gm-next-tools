# ModeToggle

Componente de alternância de tema com animações suaves e controle de hidratação.

## 📋 Visão Geral

O `ModeToggle` é um componente cliente que permite alternar entre temas claro e escuro com animações suaves. Usa uma abordagem diferente do `AppToggleTheme`, com controle de hidratação via `useEffect` e `useState`.

## 🎯 Funcionalidades

- **Alternância de Tema**: Troca entre modo claro e escuro
- **Animações Suaves**: Transições com scale e rotate
- **Controle de Hidratação**: Evita problemas de SSR
- **Ícone Único**: Botão com ícones sobrepostos
- **Acessibilidade**: Label para screen readers
- **Estados Visuais**: Feedback baseado no tema atual

## 📦 Importação

```tsx
import { ModeToggle } from '@/components/mode-toggle'
```

## 🚀 Uso

### Uso Básico
```tsx
import { ModeToggle } from '@/components/mode-toggle'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1>GM Tools</h1>
      <ModeToggle />
    </header>
  )
}
```

### Com Layout
```tsx
import { ModeToggle } from '@/components/mode-toggle'

export function SettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Configurações</h2>
      <div className="flex items-center justify-between">
        <span>Tema</span>
        <ModeToggle />
      </div>
    </div>
  )
}
```

## 🏗️ Estrutura Interna

### Implementação
```tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Controle de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="relative">
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}
```

### Layout Visual
```
┌─────────┐
│    ☀️    │  (Tema claro)
└─────────┘

┌─────────┐
│    🌙    │  (Tema escuro)
└─────────┘
```

## 🎨 Estilização

### Classes CSS Principais
```css
/* Botão base */
.variant-outline size-icon relative

/* Ícone do Sol */
.h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90

/* Ícone da Lua */
.absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0

/* Label para acessibilidade */
.sr-only
```

### Animações
- **Scale**: Ícones aparecem/desaparecem com escala
- **Rotate**: Rotação suave durante transição
- **Transition**: `transition-all` para animações suaves

## 🔧 Props

```typescript
interface ModeToggleProps {
  // Atualmente não recebe props externas
  // Usa apenas hooks internos
}
```

## 📱 Responsividade

- **Desktop**: Tamanho padrão (size="icon")
- **Tablet**: Mantém tamanho para fácil interação
- **Mobile**: Tamanho adequado para touch

## ♿ Acessibilidade

- **Screen Reader**: `sr-only` label "Alternar tema"
- **Navegação por Teclado**: Botão é focável
- **Estados**: Feedback visual claro do tema atual
- **Contraste**: Cores com contraste adequado

## 🎯 Integração com Sistema de Temas

### Dependências
- **next-themes**: Hook `useTheme` para gerenciamento
- **Lucide React**: Ícones Sun e Moon
- **Shadcn UI**: Componente Button

### Contexto Necessário
```tsx
// Deve estar dentro de ThemeProvider
import { ThemeProvider } from 'next-themes'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

## 🔄 Estados e Interações

### Estados dos Ícones
- **Tema Claro**: Sol visível, lua oculta
- **Tema Escuro**: Lua visível, sol oculto
- **Transição**: Animações suaves entre estados

### Interações do Usuário
- **Clique**: Alterna entre temas
- **Hover**: Efeitos de hover do botão
- **Persistência**: Tema salvo no localStorage

## 📝 Notas de Implementação

### Controle de Hidratação
```tsx
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) {
  return null
}
```

### Lógica de Alternância
```tsx
const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light')
}
```

### Animações CSS
```css
/* Sol - visível no tema claro */
.scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90

/* Lua - visível no tema escuro */
.scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0
```

## 🚀 Exemplos de Uso

### Header Simples
```tsx
import { ModeToggle } from '@/components/mode-toggle'

export function SimpleHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">GM Tools</h1>
      <ModeToggle />
    </div>
  )
}
```

### Configurações
```tsx
import { ModeToggle } from '@/components/mode-toggle'

export function ThemeSettings() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Aparência</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Tema</p>
          <p className="text-sm text-muted-foreground">
            Escolha entre tema claro ou escuro
          </p>
        </div>
        <ModeToggle />
      </div>
    </div>
  )
}
```

### Customização de Estilos
```tsx
// Personalização via CSS
<div className="custom-mode-toggle">
  <ModeToggle />
</div>

<style jsx>{`
  .custom-mode-toggle {
    /* Estilos customizados */
  }
`}</style>
```

## 🔄 Comparação com AppToggleTheme

| Característica | ModeToggle | AppToggleTheme |
|----------------|------------|----------------|
| **Hidratação** | useEffect + useState | suppressHydrationWarning |
| **Ícones** | Sobrepostos com animação | Separados |
| **Estilo** | Botão outline | Container com border |
| **Animações** | Scale + Rotate | Transições simples |
| **Uso** | Geral | Específico para topbar |

## 🔮 Melhorias Futuras

- [ ] **Tema Sistema**: Suporte ao tema automático
- [ ] **Mais Animações**: Efeitos mais elaborados
- [ ] **Temas Customizados**: Mais opções além de claro/escuro
- [ ] **Atalhos**: Keyboard shortcuts
- [ ] **Indicador**: Mostrar tema atual ativamente

## 🧪 Testes

### Cenários de Teste
1. **Alternância**: Clique alterna entre temas corretamente
2. **Animações**: Transições suaves funcionam
3. **Hidratação**: Não causa problemas de SSR
4. **Persistência**: Tema mantido após reload
5. **Acessibilidade**: Navegação por teclado funciona
6. **Responsividade**: Funciona em diferentes telas

### Estados de Teste
- **Primeira Renderização**: Não renderiza até mounted
- **Tema Claro**: Sol visível, lua oculta
- **Tema Escuro**: Lua visível, sol oculto
- **Transição**: Animações suaves entre estados

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: next-themes, Lucide React, Shadcn UI Button
