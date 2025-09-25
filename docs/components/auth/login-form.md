# LoginForm - Componente de Login

## 📋 Visão Geral

Componente de formulário de login responsivo usando Shadcn UI, React Hook Form e validação Zod. Integrado com Better Auth para autenticação segura.

## 🎯 Funcionalidades

- **Validação em Tempo Real**: Validação Zod com feedback imediato
- **Estados de Loading**: Indicadores visuais durante o envio
- **Tratamento de Erros**: Mensagens de erro amigáveis
- **Toggle de Senha**: Visualização/ocultação da senha
- **Navegação**: Link para página de registro
- **Responsivo**: Layout adaptado para mobile e desktop

## 🛠️ Implementação

### Localização
```
components/auth/login-form.tsx
```

### Dependências
- `react-hook-form` - Gerenciamento de formulário
- `@hookform/resolvers/zod` - Resolver Zod para validação
- `zod` - Validação de schema
- `better-auth/react` - Cliente de autenticação
- `next/navigation` - Navegação do Next.js

### Props
```typescript
interface LoginFormProps {
  // Não recebe props - componente autônomo
}
```

## 📝 Schema de Validação

```typescript
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})
```

## 🎨 Estados Visuais

### Estados de Loading
- **Enviando**: Botão desabilitado com spinner
- **Sucesso**: Redirecionamento automático
- **Erro**: Mensagem de erro abaixo do formulário

### Campos do Formulário
- **Email**: Input tipo email com validação
- **Senha**: Input tipo password com toggle de visibilidade
- **Botão**: Estado loading com spinner interno

## 🔧 Integração com Better Auth

### Hook de Autenticação
```typescript
const { signIn, isPending } = authClient
```

### Fluxo de Login
1. Validação do formulário com Zod
2. Chamada para `signIn` do Better Auth
3. Redirecionamento em caso de sucesso
4. Exibição de erro em caso de falha

## 📱 Responsividade

### Desktop
- Layout centralizado com card
- Campos lado a lado quando apropriado
- Espaçamento generoso

### Mobile
- Layout full-width
- Campos empilhados verticalmente
- Botões com tamanho touch-friendly

## 🎯 Casos de Uso

### Uso Principal
```tsx
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  )
}
```

### Integração com Layout
- Usado na página `/auth/login`
- Layout específico para autenticação
- Redirecionamento após login bem-sucedido

## 🔒 Segurança

### Validação
- Validação client-side com Zod
- Validação server-side no Better Auth
- Sanitização automática de inputs

### Proteção
- Rate limiting no Better Auth
- Proteção contra CSRF
- Sessões seguras com cookies httpOnly

## 🧪 Testes

### Cenários de Teste
- [ ] Login com credenciais válidas
- [ ] Validação de campos obrigatórios
- [ ] Tratamento de erros de autenticação
- [ ] Responsividade em diferentes telas
- [ ] Acessibilidade com screen readers

### Playwright
```typescript
// Exemplo de teste
await page.fill('[data-testid="email"]', 'user@example.com')
await page.fill('[data-testid="password"]', 'password123')
await page.click('[data-testid="submit"]')
await expect(page).toHaveURL('/dashboard')
```

## 📚 Documentação Relacionada

- **[RegisterForm](register-form.md)** - Formulário de registro
- **[UserMenu](user-menu.md)** - Menu do usuário autenticado
- **[Better Auth Setup](../../BETTER_AUTH_SETUP.md)** - Configuração do sistema de auth
- **[Schemas](../../lib/schemas.md)** - Schemas de validação Zod

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
