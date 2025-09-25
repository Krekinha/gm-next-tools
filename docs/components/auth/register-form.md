# RegisterForm - Componente de Registro

## 📋 Visão Geral

Componente de formulário de registro responsivo usando Shadcn UI, React Hook Form e validação Zod. Integrado com Better Auth para criação segura de contas.

## 🎯 Funcionalidades

- **Validação Robusta**: Validação Zod com regras de senha forte
- **Confirmação de Senha**: Validação de correspondência de senhas
- **Estados de Loading**: Indicadores visuais durante o envio
- **Tratamento de Erros**: Mensagens de erro específicas por campo
- **Toggle de Senha**: Visualização/ocultação para ambos os campos de senha
- **Navegação**: Link para página de login
- **Responsivo**: Layout adaptado para mobile e desktop

## 🛠️ Implementação

### Localização
```
components/auth/register-form.tsx
```

### Dependências
- `react-hook-form` - Gerenciamento de formulário
- `@hookform/resolvers/zod` - Resolver Zod para validação
- `zod` - Validação de schema
- `better-auth/react` - Cliente de autenticação
- `next/navigation` - Navegação do Next.js

### Props
```typescript
interface RegisterFormProps {
  // Não recebe props - componente autônomo
}
```

## 📝 Schema de Validação

```typescript
const registerSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'
    ),
  confirmPassword: z.string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})
```

## 🎨 Estados Visuais

### Estados de Loading
- **Enviando**: Botão desabilitado com spinner
- **Sucesso**: Redirecionamento automático para login
- **Erro**: Mensagem de erro abaixo do formulário

### Campos do Formulário
- **Nome**: Input texto com validação de comprimento
- **Email**: Input tipo email com validação
- **Senha**: Input tipo password com validação de força
- **Confirmar Senha**: Input tipo password com validação de correspondência
- **Botão**: Estado loading com spinner interno

## 🔧 Integração com Better Auth

### Hook de Autenticação
```typescript
const { signUp, isPending } = authClient
```

### Fluxo de Registro
1. Validação do formulário com Zod
2. Verificação de correspondência de senhas
3. Chamada para `signUp` do Better Auth
4. Redirecionamento para login em caso de sucesso
5. Exibição de erro em caso de falha

## 📱 Responsividade

### Desktop
- Layout centralizado com card
- Campos organizados em grid quando apropriado
- Espaçamento generoso entre elementos

### Mobile
- Layout full-width
- Campos empilhados verticalmente
- Botões com tamanho touch-friendly
- Scroll suave para campos fora da viewport

## 🎯 Casos de Uso

### Uso Principal
```tsx
import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <RegisterForm />
    </div>
  )
}
```

### Integração com Layout
- Usado na página `/auth/register`
- Layout específico para autenticação
- Redirecionamento após registro bem-sucedido

## 🔒 Segurança

### Validação de Senha
- Mínimo 6 caracteres
- Pelo menos uma letra minúscula
- Pelo menos uma letra maiúscula
- Pelo menos um número
- Confirmação obrigatória

### Proteção
- Validação client-side com Zod
- Validação server-side no Better Auth
- Sanitização automática de inputs
- Proteção contra ataques de força bruta

## 🧪 Testes

### Cenários de Teste
- [ ] Registro com dados válidos
- [ ] Validação de campos obrigatórios
- [ ] Validação de força da senha
- [ ] Validação de correspondência de senhas
- [ ] Tratamento de erros de registro
- [ ] Responsividade em diferentes telas
- [ ] Acessibilidade com screen readers

### Playwright
```typescript
// Exemplo de teste
await page.fill('[data-testid="name"]', 'João Silva')
await page.fill('[data-testid="email"]', 'joao@example.com')
await page.fill('[data-testid="password"]', 'MinhaSenh@123')
await page.fill('[data-testid="confirmPassword"]', 'MinhaSenh@123')
await page.click('[data-testid="submit"]')
await expect(page).toHaveURL('/auth/login')
```

## 📊 Validações Específicas

### Campo Nome
- Obrigatório
- Mínimo 2 caracteres
- Aceita caracteres especiais e acentos

### Campo Email
- Obrigatório
- Formato de email válido
- Case insensitive

### Campo Senha
- Obrigatório
- Mínimo 6 caracteres
- Deve conter pelo menos:
  - 1 letra minúscula (a-z)
  - 1 letra maiúscula (A-Z)
  - 1 número (0-9)

### Campo Confirmar Senha
- Obrigatório
- Deve ser idêntico ao campo senha
- Validação em tempo real

## 📚 Documentação Relacionada

- **[LoginForm](login-form.md)** - Formulário de login
- **[UserMenu](user-menu.md)** - Menu do usuário autenticado
- **[Better Auth Setup](../../BETTER_AUTH_SETUP.md)** - Configuração do sistema de auth
- **[Schemas](../../lib/schemas.md)** - Schemas de validação Zod

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
