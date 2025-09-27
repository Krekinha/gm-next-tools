# AppToggleTheme

Componente de alternância de tema para a aplicação GM Tools, permitindo trocar entre modo claro e escuro.

## 📋 Visão Geral

O `AppToggleTheme` é um componente cliente que permite aos usuários alternar entre os temas claro e escuro da aplicação. É integrado ao sistema de temas do Next.js e não causa problemas de hidratação.

## 🎯 Funcionalidades

- **Alternância de Tema**: Troca entre modo claro e escuro
- **Ícones Visuais**: Sol para tema claro, lua para tema escuro
- **Acessibilidade**: Labels adequados para screen readers
- **Estados Visuais**: Feedback visual baseado no tema atual
- **Sem Hidratação**: Não causa problemas de SSR/hidratação

## 📦 Importação

```tsx
import { AppToggleTheme } from '@/components/layout/app-toggle-theme'
```

## 🚀 Uso

### Uso Básico
```tsx
import { AppToggleTheme } from '@/components/layout/app-toggle-theme'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1>GM Tools</h1>
      <AppToggleTheme />
    </header>
  )
}
```

### Integração com AppTopbar
```tsx
// components/layout/app-topbar.tsx
import { AppToggleTheme } from '@/components/layout/app-toggle-theme'

export function AppTopbar() {
  return (
    <header className="flex h-16 items-center justify-between px-4">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <AppToggleTheme />
        <UserMenu />
      </div>
    </header>
  )
}
```

## 🏗️ Estrutura Interna

### Implementação
```tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function AppToggleTheme() {
  const { setTheme } = useTheme()

  return (
    <div className="inline-flex items-center rounded-full border p-0.5 border-gray-700">
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Ativar tema claro"
      >
        <Sun className="dark:hover:text-gray-500 dark:text-gray-700 text-amber-400 size-7 rounded-full p-1.5" />
      </button>

      <button 
        type="button" 
        onClick={() => setTheme('dark')} 
        aria-label="Ativar tema escuro"
      >
        <Moon className="lucide lucide-moon text-gray-700 hover:text-gray-500 dark:text-amber-400 size-7 rounded-full p-1.5" />
      </button>
    </div>
  )
}
```

### Layout Visual
```
┌─────────────────────┐
│ [☀️] [🌙] │
└─────────────────────┘
```

## 🎨 Estilização

### Classes CSS Principais
```css
/* Container principal */
.inline-flex items-center rounded-full border p-0.5 border-gray-700

/* Botões */
button {
  /* Estilos específicos para cada ícone */
}

/* Ícone do Sol */
.dark:hover:text-gray-500 dark:text-gray-700 text-amber-400 size-7 rounded-full p-1.5

/* Ícone da Lua */
.text-gray-700 hover:text-gray-500 dark:text-amber-400 size-7 rounded-full p-1.5
```

### Estados Visuais
- **Tema Claro**: Sol em amarelo, lua em cinza
- **Tema Escuro**: Sol em cinza escuro, lua em amarelo
- **Hover**: Efeitos de transição suaves

## 🔧 Props

```typescript
interface AppToggleThemeProps {
  // Atualmente não recebe props externas
}
```

## 📱 Responsividade

- **Desktop**: Tamanho padrão (size-7)
- **Tablet**: Mantém tamanho para fácil interação
- **Mobile**: Tamanho adequado para touch

## ♿ Acessibilidade

- **Labels**: `aria-label` para cada botão
- **Navegação por Teclado**: Botões são focáveis
- **Screen Readers**: Descrições claras das ações
- **Contraste**: Cores com contraste adequado

## 🎯 Integração com Sistema de Temas

### Dependências
- **next-themes**: Hook `useTheme` para gerenciamento
- **Lucide React**: Ícones Sun e Moon

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
- **Tema Claro Ativo**: Sol destacado em amarelo
- **Tema Escuro Ativo**: Lua destacada em amarelo
- **Hover**: Efeitos de transição suaves

### Interações do Usuário
- **Clique no Sol**: Ativa tema claro
- **Clique na Lua**: Ativa tema escuro
- **Persistência**: Tema salvo no localStorage

## 📝 Notas de Implementação

### Decisões Técnicas
- **'use client'**: Necessário para interações do usuário
- **useTheme**: Hook do next-themes para gerenciamento
- **Ícones Separados**: Botões individuais para cada tema
- **Border Container**: Visual de toggle switch

### Otimizações
- **Sem Estado Local**: Usa apenas o contexto do tema
- **Ícones Otimizados**: Lucide React para performance
- **Classes Condicionais**: Estilos baseados no tema atual

## 🚀 Exemplos de Uso

### Header Simples
```tsx
import { AppToggleTheme } from '@/components/layout/app-toggle-theme'

export function SimpleHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">GM Tools</h1>
      <AppToggleTheme />
    </div>
  )
}
```

### Sidebar com Toggle
```tsx
import { AppToggleTheme } from '@/components/layout/app-toggle-theme'

export function SidebarFooter() {
  return (
    <div className="p-4 border-t">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Tema</span>
        <AppToggleTheme />
      </div>
    </div>
  )
}
```

### Customização de Estilos
```tsx
// Personalização via CSS
<div className="custom-theme-toggle">
  <AppToggleTheme />
</div>

<style jsx>{`
  .custom-theme-toggle {
    /* Estilos customizados */
  }
`}</style>
```

## 🔮 Melhorias Futuras

- [ ] **Tema Sistema**: Suporte ao tema automático do sistema
- [ ] **Animações**: Transições suaves entre temas
- [ ] **Temas Customizados**: Mais opções além de claro/escuro
- [ ] **Indicador Visual**: Mostrar tema atual ativamente
- [ ] **Atalhos**: Suporte a keyboard shortcuts

## 🧪 Testes

### Cenários de Teste
1. **Alternância**: Clique alterna entre temas corretamente
2. **Persistência**: Tema mantido após reload da página
3. **Acessibilidade**: Navegação por teclado funciona
4. **Estados Visuais**: Ícones refletem tema atual
5. **Responsividade**: Funciona em diferentes tamanhos de tela

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: next-themes, Lucide React
