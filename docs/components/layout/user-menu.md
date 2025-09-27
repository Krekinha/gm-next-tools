# UserMenu

Componente de menu do usuário com avatar, informações do perfil e ações de navegação.

## 📋 Visão Geral

O `UserMenu` é um componente cliente que exibe o avatar do usuário e fornece acesso rápido ao perfil, configurações e logout. Integra-se com o sistema de autenticação Supabase e fornece feedback visual adequado.

## 🎯 Funcionalidades

- **Avatar do Usuário**: Exibe foto ou iniciais do nome
- **Informações do Perfil**: Nome, email e role do usuário
- **Navegação Rápida**: Acesso ao perfil e configurações
- **Logout Seguro**: Desconexão com feedback visual
- **Estados de Loading**: Feedback durante operações
- **Notificações**: Toast messages para feedback do usuário

## 📦 Importação

```tsx
import { UserMenu } from '@/components/layout/user-menu'
```

## 🚀 Uso

### Uso Básico
```tsx
import { UserMenu } from '@/components/layout/user-menu'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1>GM Tools</h1>
      <UserMenu />
    </header>
  )
}
```

### Integração com AppTopbar
```tsx
// components/layout/app-topbar.tsx
import { UserMenu } from '@/components/layout/user-menu'

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

### Implementação Principal
```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Settings, LogOut, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function UserMenu() {
  const router = useRouter()
  const { profile, loading: profileLoading } = useUserProfile()
  const { signOut, loading: signOutLoading } = useAuthActions()
  const [isOpen, setIsOpen] = useState(false)

  // Lógica de logout, navegação e renderização...
}
```

### Estrutura do Dropdown
```tsx
<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="h-8 w-8">
        <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
        <AvatarFallback className="text-xs">
          {getInitials()}
        </AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent className="w-56" align="end">
    {/* Conteúdo do menu */}
  </DropdownMenuContent>
</DropdownMenu>
```

## 🎨 Estilização

### Classes CSS Principais
```css
/* Avatar */
.h-8 w-8 rounded-full

/* Dropdown */
.w-56 align-end

/* Estados de loading */
.animate-pulse

/* Botão de logout */
.text-destructive focus:text-destructive
```

### Estados Visuais
- **Loading**: Skeleton com animação pulse
- **Avatar**: Foto do usuário ou iniciais
- **Hover**: Efeitos de transição suaves
- **Logout**: Cor destrutiva para ação crítica

## 🔧 Props

```typescript
interface UserMenuProps {
  // Atualmente não recebe props externas
  // Usa hooks internos para dados do usuário
}
```

## 📱 Responsividade

- **Desktop**: Menu dropdown completo
- **Tablet**: Mantém funcionalidade completa
- **Mobile**: Menu adaptado para touch

## ♿ Acessibilidade

- **Avatar**: Alt text adequado
- **Dropdown**: Navegação por teclado
- **Labels**: Descrições claras das ações
- **Estados**: Feedback visual para loading

## 🎯 Integração com Autenticação

### Hooks Utilizados
```tsx
import { useUserProfile, useAuthActions } from '@/hooks/use-auth'

// Dados do usuário
const { profile, loading: profileLoading } = useUserProfile()

// Ações de autenticação
const { signOut, loading: signOutLoading } = useAuthActions()
```

### Dependências
- **Supabase Auth**: Sistema de autenticação
- **Next.js Router**: Navegação programática
- **Sonner**: Sistema de notificações
- **Shadcn UI**: Componentes de interface

## 🔄 Estados e Interações

### Estados do Componente
- **Loading**: Skeleton durante carregamento do perfil
- **Sem Perfil**: Não renderiza se não há usuário
- **Dropdown Aberto**: Estado controlado localmente
- **Logout Loading**: Estado durante desconexão

### Interações do Usuário
- **Clique no Avatar**: Abre/fecha dropdown
- **Perfil**: Navega para `/profile`
- **Configurações**: Navega para `/settings`
- **Logout**: Desconecta e redireciona para login

## 📝 Notas de Implementação

### Lógica de Iniciais
```tsx
const getInitials = () => {
  if (profile.full_name) {
    return profile.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  return profile.email.slice(0, 2).toUpperCase()
}
```

### Tratamento de Logout
```tsx
const handleSignOut = async () => {
  const result = await signOut()
  
  if (result.success) {
    toast.success('Logout realizado com sucesso!')
    router.push('/auth/login')
  } else {
    toast.error(result.error || 'Erro ao fazer logout')
  }
}
```

### Estados de Loading
```tsx
// Skeleton durante carregamento
if (profileLoading) {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      <div className="h-4 w-20 bg-muted animate-pulse rounded" />
    </div>
  )
}
```

## 🚀 Exemplos de Uso

### Header com UserMenu
```tsx
import { UserMenu } from '@/components/layout/user-menu'

export function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">GM Tools</h1>
      </div>
      <div className="flex items-center gap-2">
        <AppToggleTheme />
        <UserMenu />
      </div>
    </header>
  )
}
```

### Sidebar com UserMenu
```tsx
import { UserMenu } from '@/components/layout/user-menu'

export function SidebarFooter() {
  return (
    <div className="p-4 border-t">
      <div className="flex items-center justify-between">
        <UserMenu />
      </div>
    </div>
  )
}
```

### Customização de Estilos
```tsx
// Personalização via CSS
<div className="custom-user-menu">
  <UserMenu />
</div>

<style jsx>{`
  .custom-user-menu {
    /* Estilos customizados */
  }
`}</style>
```

## 🔮 Melhorias Futuras

- [ ] **Upload de Avatar**: Permitir alteração da foto
- [ ] **Notificações**: Badge de notificações não lidas
- [ ] **Atalhos**: Keyboard shortcuts para ações
- [ ] **Temas**: Personalização de cores do avatar
- [ ] **Status**: Indicador de status online/offline

## 🧪 Testes

### Cenários de Teste
1. **Renderização**: Componente renderiza com dados do usuário
2. **Dropdown**: Menu abre e fecha corretamente
3. **Navegação**: Links funcionam adequadamente
4. **Logout**: Desconexão funciona com feedback
5. **Loading**: Estados de loading exibidos corretamente
6. **Acessibilidade**: Navegação por teclado funciona

### Estados de Teste
- **Usuário Logado**: Menu completo com todas as opções
- **Usuário sem Avatar**: Fallback para iniciais
- **Loading**: Skeleton durante carregamento
- **Erro de Logout**: Feedback de erro adequado

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: Supabase Auth, Next.js Router, Sonner, Shadcn UI
