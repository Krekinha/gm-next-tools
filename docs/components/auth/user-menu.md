# UserMenu - Menu do Usuário

## 📋 Visão Geral

Componente de menu dropdown para usuários autenticados, exibindo informações do usuário e opções de logout. Integrado com Better Auth para gerenciamento de sessão.

## 🎯 Funcionalidades

- **Informações do Usuário**: Exibe nome, email e role do usuário
- **Menu Dropdown**: Interface elegante com Shadcn UI
- **Logout**: Opção segura de encerramento de sessão
- **Estado de Loading**: Indicadores durante operações
- **Responsivo**: Adaptado para diferentes tamanhos de tela
- **Acessível**: Compatível com navegação por teclado

## 🛠️ Implementação

### Localização
```
components/auth/user-menu.tsx
```

### Dependências
- `better-auth/react` - Cliente de autenticação
- `@radix-ui/react-dropdown-menu` - Componente dropdown
- `@radix-ui/react-avatar` - Avatar do usuário
- `lucide-react` - Ícones

### Props
```typescript
interface UserMenuProps {
  // Não recebe props - componente autônomo
}
```

## 🎨 Estrutura Visual

### Avatar
- **Inicial**: Primeira letra do nome do usuário
- **Fallback**: Ícone de usuário padrão
- **Estilo**: Circular com fundo colorido

### Menu Dropdown
- **Trigger**: Avatar clicável
- **Conteúdo**: Informações do usuário + opções
- **Posicionamento**: Automático baseado no espaço disponível

### Informações Exibidas
- **Nome**: Nome completo do usuário
- **Email**: Endereço de email
- **Role**: Função do usuário (user/admin)

## 🔧 Integração com Better Auth

### Hook de Sessão
```typescript
const { data: session, isPending } = useSession()
```

### Dados do Usuário
```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  image?: string
}
```

### Estado de Loading
- **Carregando**: Skeleton ou spinner
- **Não autenticado**: Não renderiza o componente
- **Autenticado**: Exibe menu completo

## 📱 Responsividade

### Desktop
- Menu dropdown completo
- Informações detalhadas
- Hover states

### Mobile
- Menu adaptado para touch
- Informações condensadas
- Touch-friendly targets

## 🎯 Casos de Uso

### Uso Principal
```tsx
import { UserMenu } from '@/components/auth/user-menu'

export default function AppTopbar() {
  return (
    <header className="flex items-center justify-between">
      <Logo />
      <UserMenu />
    </header>
  )
}
```

### Integração com Layout
- Usado no `AppTopbar`
- Sempre visível para usuários autenticados
- Posicionado no canto superior direito

## 🔒 Segurança

### Dados Sensíveis
- Email mascarado se necessário
- Informações limitadas ao essencial
- Não exposição de dados internos

### Logout Seguro
- Limpeza completa da sessão
- Redirecionamento para login
- Invalidação de cookies

## 🧪 Testes

### Cenários de Teste
- [ ] Exibição correta das informações do usuário
- [ ] Funcionamento do menu dropdown
- [ ] Logout bem-sucedido
- [ ] Responsividade em diferentes telas
- [ ] Acessibilidade com teclado
- [ ] Estado de loading adequado

### Playwright
```typescript
// Exemplo de teste
await page.click('[data-testid="user-menu-trigger"]')
await expect(page.locator('[data-testid="user-name"]')).toContainText('João Silva')
await page.click('[data-testid="logout-button"]')
await expect(page).toHaveURL('/auth/login')
```

## 🎨 Customização

### Avatar
```typescript
// Personalização do avatar
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
```

### Cores por Role
```typescript
const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin': return 'text-red-600'
    case 'user': return 'text-blue-600'
    default: return 'text-gray-600'
  }
}
```

## 📊 Estados do Componente

### Loading
- Skeleton do avatar
- Menu desabilitado
- Indicador de carregamento

### Autenticado
- Avatar com inicial
- Menu funcional
- Informações completas

### Erro
- Avatar padrão
- Menu com opção de logout
- Mensagem de erro discreta

## 🔄 Fluxo de Interação

1. **Hover/Click**: Abre menu dropdown
2. **Visualização**: Exibe informações do usuário
3. **Logout**: Confirma e encerra sessão
4. **Redirecionamento**: Volta para página de login

## 📚 Documentação Relacionada

- **[LogoutButton](logout-button.md)** - Componente de logout
- **[LoginForm](login-form.md)** - Formulário de login
- **[AppTopbar](../layout/app-topbar.md)** - Layout que usa o UserMenu
- **[Better Auth Setup](../../BETTER_AUTH_SETUP.md)** - Configuração do sistema de auth

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
