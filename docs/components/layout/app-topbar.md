# AppTopbar

Componente da barra superior da aplicação GM Tools com controles de navegação, tema e usuário.

## 📋 Visão Geral

O `AppTopbar` é o componente responsável pela barra superior da aplicação, contendo o trigger da sidebar, controles de tema e menu do usuário. É um componente cliente que gerencia interações do usuário.

## 🎯 Funcionalidades

- **Sidebar Trigger**: Botão para abrir/fechar a sidebar
- **Controle de Tema**: Alternância entre tema claro e escuro
- **Menu do Usuário**: Acesso ao perfil e logout
- **Layout Fixo**: Permanece no topo durante o scroll
- **Responsividade**: Adapta-se a diferentes tamanhos de tela
- **Hidratação Segura**: Usa suppressHydrationWarning para evitar problemas

## 📦 Importação

```tsx
import { AppTopbar } from '@/components/layout/app-topbar'
```

## 🚀 Uso

### Uso Básico
```tsx
import { AppTopbar } from '@/components/layout/app-topbar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppTopbar />
      <main>{children}</main>
    </div>
  )
}
```

### Com Layout Compartilhado
```tsx
// app/layout.tsx
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { AppTopbar } from '@/components/layout/app-topbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppTopbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

## 🏗️ Estrutura Interna

### Componentes Integrados
```tsx
export function AppTopbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 bg-background" suppressHydrationWarning>
      {/* Lado esquerdo - Sidebar trigger */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>
      
      {/* Lado direito - Controles */}
      <div className="flex items-center gap-2">
        <AppToggleTheme />
        <UserMenu />
      </div>
    </header>
  )
}
```

### Layout Visual
```
┌─────────────────────────────────────────────────────────┐
│ [☰]                                           [🌙] [👤] │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Estilização

### Classes CSS Principais
```css
/* Container principal */
.flex h-16 shrink-0 items-center justify-between gap-2 px-4 bg-background

/* Lado esquerdo */
.flex items-center gap-2

/* Lado direito */
.flex items-center gap-2
```

### Características de Design
- **Altura Fixa**: `h-16` para consistência visual
- **Flexbox**: `justify-between` para distribuição dos elementos
- **Espaçamento**: `gap-2` entre elementos
- **Padding**: `px-4` para espaçamento lateral
- **Background**: `bg-background` para tema dinâmico

## 🔧 Props

```typescript
interface AppTopbarProps {
  // Atualmente não recebe props externas
}
```

## 📱 Responsividade

- **Desktop**: Layout completo com todos os controles
- **Tablet**: Adaptação automática do espaçamento
- **Mobile**: Controles compactos mantendo funcionalidade

## ♿ Acessibilidade

- **Navegação por Teclado**: Todos os elementos são focáveis
- **Screen Readers**: Labels adequados nos componentes filhos
- **Contraste**: Cores compatíveis com WCAG 2.1 AA
- **Hidratação**: suppressHydrationWarning evita problemas de SSR

## 🎯 Integração com Outros Componentes

### Dependências
- **SidebarTrigger**: Botão de toggle da sidebar
- **AppToggleTheme**: Controle de alternância de tema
- **UserMenu**: Menu dropdown do usuário

### Contexto de Uso
```tsx
// Deve ser usado dentro de SidebarProvider
<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <AppTopbar /> {/* Aqui */}
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
```

## 🔄 Estados e Interações

### Estados dos Controles
- **SidebarTrigger**: Estado visual baseado na sidebar (aberta/fechada)
- **AppToggleTheme**: Estado visual baseado no tema atual
- **UserMenu**: Estado de hover e dropdown

### Interações do Usuário
- **Clique no SidebarTrigger**: Alterna visibilidade da sidebar
- **Clique no AppToggleTheme**: Alterna entre tema claro/escuro
- **Clique no UserMenu**: Abre menu dropdown com opções

## 📝 Notas de Implementação

### Decisões Técnicas
- **'use client'**: Necessário para interações do usuário
- **suppressHydrationWarning**: Evita problemas de hidratação com temas
- **justify-between**: Garante posicionamento correto dos elementos
- **gap-2**: Espaçamento consistente entre controles

### Otimizações
- **shrink-0**: Evita compressão do header
- **h-16**: Altura fixa para performance
- **bg-background**: Tema dinâmico sem JavaScript adicional

## 🚀 Exemplos de Uso

### Layout Completo
```tsx
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { AppTopbar } from '@/components/layout/app-topbar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppTopbar />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Customização de Estilos
```tsx
// Personalização via CSS
<AppTopbar className="border-b-2 border-primary" />
```

## 🔮 Melhorias Futuras

- [ ] **Breadcrumbs**: Navegação contextual
- [ ] **Notificações**: Sistema de alertas
- [ ] **Busca Global**: Campo de busca integrado
- [ ] **Atalhos**: Suporte a keyboard shortcuts
- [ ] **Temas Customizados**: Mais opções de personalização

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: SidebarTrigger, AppToggleTheme, UserMenu
