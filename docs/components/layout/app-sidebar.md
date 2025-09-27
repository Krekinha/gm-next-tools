# AppSidebar

Componente de navegação principal da aplicação GM Tools, construído sobre os primitivos do Shadcn UI Sidebar.

## 📋 Visão Geral

O `AppSidebar` é o componente central de navegação da aplicação, fornecendo acesso rápido às principais funcionalidades através de uma interface lateral responsiva.

## 🎯 Funcionalidades

- **Navegação Principal**: Acesso às páginas principais (Dashboard, Documentos, Relatórios)
- **Branding Consistente**: Logo GMTools com versão no header
- **Organização por Grupos**: Menu organizado por categorias funcionais
- **Tooltips Informativos**: Descrições dos itens de menu
- **Responsividade**: Sidebar colapsível em dispositivos móveis
- **Acessibilidade**: Compatível com navegação por teclado e screen readers

## 📦 Importação

```tsx
import { AppSidebar } from "@/components/layout/app-sidebar"
```

## 🚀 Uso

### Uso Básico
```tsx
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="h-16 border-b flex items-center gap-2 px-4">
          <SidebarTrigger />
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Com Layout Compartilhado
```tsx
// app/layout.tsx
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppTopbar } from "@/components/layout/app-topbar"

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

## 🏗️ Estrutura do Menu

### Grupos de Navegação
```typescript
const menuItems = [
  {
    groupTitle: '', // Sem título para grupo principal
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
        description: 'Visão geral das ferramentas',
      },
      {
        title: 'Documentos',
        url: '/documents',
        icon: FileText,
        description: 'Gestão de documentos',
      },
    ],
  },
  {
    groupTitle: 'Relatórios',
    items: [
      {
        title: 'Relatório técnico',
        url: '/reports/technical',
        icon: BarChart3,
        description: 'Relatórios técnicos detalhados',
      },
    ],
  },
]
```

### Estrutura de Item de Menu
```typescript
interface MenuItem {
  title: string        // Nome exibido no menu
  url: string          // URL de destino
  icon: LucideIcon     // Ícone do item
  description: string  // Tooltip descritivo
}
```

## 🎨 Customização

### Variantes de Sidebar
```tsx
// Sidebar flutuante (padrão)
<AppSidebar variant="floating" />

// Sidebar fixa
<AppSidebar variant="inset" />
```

### Personalização de Estilos
```tsx
<AppSidebar className="custom-sidebar-class" />
```

## 🔧 Props

```typescript
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  // Herda todas as props do componente Sidebar do Shadcn UI
}
```

## 📱 Responsividade

- **Desktop**: Sidebar fixa com navegação completa
- **Tablet**: Sidebar colapsível com trigger
- **Mobile**: Sidebar em drawer overlay

## ♿ Acessibilidade

- **Navegação por Teclado**: Tab para navegar entre itens
- **Screen Readers**: Labels e descrições adequadas
- **Contraste**: Cores compatíveis com WCAG 2.1 AA
- **Foco Visível**: Indicadores de foco claros

## 🎯 Integração com Layout

O `AppSidebar` é projetado para trabalhar em conjunto com:

- **AppTopbar**: Barra superior com ações do usuário
- **SidebarProvider**: Contexto para estado da sidebar
- **SidebarTrigger**: Botão para toggle da sidebar
- **SidebarInset**: Container principal do conteúdo

## 📝 Notas de Implementação

- **Logo GMTools**: Exibe logo com ícone GalleryVerticalEnd
- **Versão**: Mostra versão atual (v1.0.0) no header
- **Link Root**: Logo aponta para página principal (/)
- **Renderização Condicional**: SidebarGroupLabel só aparece se groupTitle existir
- **Tooltips**: Descrições aparecem no hover dos itens

## 🚀 Exemplos de Uso

### Dashboard Principal
```tsx
// Acesso via sidebar para página principal
<a href="/">Dashboard Principal</a>
```

### Página de Documentos
```tsx
// Navegação para gestão de documentos
<a href="/documents">Documentos</a>
```

### Relatórios Técnicos
```tsx
// Acesso aos relatórios técnicos
<a href="/reports/technical">Relatório Técnico</a>
```

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: Shadcn UI Sidebar, Lucide React

