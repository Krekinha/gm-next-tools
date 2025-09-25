# LogoutButton - Botão de Logout

## 📋 Visão Geral

Componente reutilizável de botão para logout seguro, integrado com Better Auth. Pode ser usado em diferentes contextos (menu dropdown, página de perfil, etc.).

## 🎯 Funcionalidades

- **Logout Seguro**: Encerramento completo da sessão
- **Estados Visuais**: Loading, sucesso e erro
- **Flexibilidade**: Pode ser usado em diferentes contextos
- **Acessibilidade**: Compatível com navegação por teclado
- **Responsivo**: Adaptado para diferentes tamanhos de tela

## 🛠️ Implementação

### Localização
```
components/auth/logout-button.tsx
```

### Dependências
- `better-auth/react` - Cliente de autenticação
- `next/navigation` - Navegação do Next.js
- `lucide-react` - Ícones

### Props
```typescript
interface LogoutButtonProps {
  variant?: 'default' | 'ghost' | 'outline' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  children?: React.ReactNode
  showIcon?: boolean
}
```

## 🎨 Variantes Visuais

### Variantes de Estilo
- **default**: Botão padrão com fundo
- **ghost**: Botão transparente
- **outline**: Botão com borda
- **destructive**: Botão vermelho para ações destrutivas

### Tamanhos
- **sm**: Pequeno para menus compactos
- **default**: Tamanho padrão
- **lg**: Grande para destaque
- **icon**: Apenas ícone

### Estados
- **Normal**: Estado padrão
- **Loading**: Spinner interno
- **Disabled**: Desabilitado durante operação

## 🔧 Integração com Better Auth

### Hook de Autenticação
```typescript
const { signOut, isPending } = authClient
```

### Fluxo de Logout
1. Confirmação da ação (opcional)
2. Chamada para `signOut` do Better Auth
3. Limpeza da sessão local
4. Redirecionamento para login
5. Feedback visual de sucesso

## 📱 Responsividade

### Desktop
- Hover states
- Tooltips informativos
- Espaçamento adequado

### Mobile
- Touch-friendly targets
- Tamanho mínimo de 44px
- Feedback tátil

## 🎯 Casos de Uso

### Uso Básico
```tsx
import { LogoutButton } from '@/components/auth/logout-button'

export default function UserMenu() {
  return (
    <div className="flex flex-col gap-2">
      <span>João Silva</span>
      <LogoutButton variant="ghost" size="sm">
        Sair
      </LogoutButton>
    </div>
  )
}
```

### Com Ícone
```tsx
<LogoutButton variant="destructive" showIcon>
  Logout
</LogoutButton>
```

### Apenas Ícone
```tsx
<LogoutButton variant="ghost" size="icon" showIcon>
  <LogOut className="h-4 w-4" />
</LogoutButton>
```

## 🔒 Segurança

### Logout Seguro
- Invalidação de sessão no servidor
- Limpeza de cookies locais
- Redirecionamento forçado
- Prevenção de acesso não autorizado

### Confirmação
- Opção de confirmação antes do logout
- Prevenção de logout acidental
- Feedback claro da ação

## 🧪 Testes

### Cenários de Teste
- [ ] Logout bem-sucedido
- [ ] Estados de loading
- [ ] Redirecionamento correto
- [ ] Limpeza de sessão
- [ ] Responsividade
- [ ] Acessibilidade

### Playwright
```typescript
// Exemplo de teste
await page.click('[data-testid="logout-button"]')
await expect(page).toHaveURL('/auth/login')
await expect(page.locator('[data-testid="login-form"]')).toBeVisible()
```

## 🎨 Customização

### Estilos Customizados
```tsx
<LogoutButton 
  className="bg-red-500 hover:bg-red-600 text-white"
  variant="default"
>
  Sair da Conta
</LogoutButton>
```

### Com Confirmação
```tsx
const handleLogout = async () => {
  const confirmed = confirm('Tem certeza que deseja sair?')
  if (confirmed) {
    await signOut()
  }
}
```

## 📊 Estados do Componente

### Loading
- Spinner interno
- Botão desabilitado
- Texto "Saindo..."

### Sucesso
- Redirecionamento automático
- Feedback visual discreto

### Erro
- Mensagem de erro
- Botão reabilitado
- Opção de tentar novamente

## 🔄 Fluxo de Interação

1. **Click**: Inicia processo de logout
2. **Loading**: Mostra estado de carregamento
3. **Logout**: Encerra sessão no servidor
4. **Redirecionamento**: Volta para página de login
5. **Feedback**: Confirmação visual da ação

## 📚 Documentação Relacionada

- **[UserMenu](user-menu.md)** - Menu que usa o LogoutButton
- **[LoginForm](login-form.md)** - Formulário de login
- **[Better Auth Setup](../../BETTER_AUTH_SETUP.md)** - Configuração do sistema de auth

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
