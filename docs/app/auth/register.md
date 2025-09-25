# Register Page - Página de Registro

## 📋 Visão Geral

Página de registro responsiva que utiliza o componente `RegisterForm` para criação de novas contas. Integrada com Better Auth e protegida por middleware.

## 🎯 Funcionalidades

- **Layout Responsivo**: Adaptado para mobile e desktop
- **Formulário Integrado**: Usa componente `RegisterForm`
- **Validação Robusta**: Validação de senha forte e confirmação
- **Redirecionamento**: Volta para login após registro bem-sucedido
- **Proteção**: Middleware redireciona usuários já autenticados
- **Acessibilidade**: Navegação por teclado e screen readers

## 🛠️ Implementação

### Localização
```
app/auth/register/page.tsx
```

### Dependências
- `RegisterForm` - Componente de formulário
- `Link` - Navegação do Next.js
- `ArrowLeft` - Ícone Lucide

### Estrutura
```typescript
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar nova conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha os dados abaixo para criar sua conta
          </p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link
            href="/auth/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
```

## 🎨 Design e Layout

### Estrutura Visual
- **Container Principal**: Full height com flexbox centrado
- **Card de Registro**: Largura fixa (350px) em desktop
- **Cabeçalho**: Título e descrição centralizados
- **Formulário**: Componente `RegisterForm` integrado
- **Link de Login**: Navegação para página de login

### Responsividade
- **Desktop**: Layout centralizado com card
- **Mobile**: Layout full-width adaptado
- **Tablet**: Layout intermediário responsivo

### Cores e Tema
- **Background**: Usa `bg-background` do tema
- **Texto**: Cores do sistema de design
- **Links**: Hover states com transições suaves

## 🔧 Integração com Better Auth

### Middleware de Proteção
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  })
  
  // Se já autenticado, redireciona para dashboard
  if (session && request.nextUrl.pathname === '/auth/register') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}
```

### Redirecionamento Pós-Registro
```typescript
// No RegisterForm
const handleSubmit = async (data: RegisterFormData) => {
  const result = await signUp({
    name: data.name,
    email: data.email,
    password: data.password
  })
  
  if (result.error) {
    setError(result.error.message)
  } else {
    // Redireciona para login após registro bem-sucedido
    router.push('/auth/login')
  }
}
```

## 📱 Responsividade

### Breakpoints
- **sm (640px+)**: Layout com card centralizado
- **Mobile (<640px)**: Layout full-width

### Adaptações Mobile
- Padding reduzido nas laterais
- Tamanhos de fonte otimizados
- Botões touch-friendly
- Espaçamento adequado para dedos
- Scroll suave para campos fora da viewport

## 🎯 Casos de Uso

### Acesso Direto
```
GET /auth/register
```

### Redirecionamento de Middleware
```
GET /dashboard (sem autenticação)
→ Redirect para /auth/login
→ Link para /auth/register
```

### Usuário Já Autenticado
```
GET /auth/register (com sessão ativa)
→ Redirect para /dashboard
```

### Fluxo Completo
```
GET /auth/register
→ Preenchimento do formulário
→ POST /api/auth/sign-up/email
→ Redirect para /auth/login
→ Login com nova conta
→ Redirect para /dashboard
```

## 🔒 Segurança

### Validação de Senha
- Mínimo 6 caracteres
- Pelo menos uma letra minúscula
- Pelo menos uma letra maiúscula
- Pelo menos um número
- Confirmação obrigatória

### Proteção de Rotas
- Middleware verifica autenticação
- Redirecionamento automático
- Prevenção de acesso não autorizado

### Validação
- Validação client-side com Zod
- Validação server-side no Better Auth
- Sanitização de inputs
- Verificação de email único

## 🧪 Testes

### Cenários de Teste
- [ ] Carregamento da página
- [ ] Preenchimento do formulário
- [ ] Validação de campos obrigatórios
- [ ] Validação de força da senha
- [ ] Validação de correspondência de senhas
- [ ] Registro bem-sucedido
- [ ] Tratamento de erros
- [ ] Redirecionamento após registro
- [ ] Responsividade em diferentes telas
- [ ] Acessibilidade com teclado

### Playwright
```typescript
test('should register successfully', async ({ page }) => {
  await page.goto('/auth/register')
  
  await page.fill('[data-testid="name"]', 'João Silva')
  await page.fill('[data-testid="email"]', 'joao@example.com')
  await page.fill('[data-testid="password"]', 'MinhaSenh@123')
  await page.fill('[data-testid="confirmPassword"]', 'MinhaSenh@123')
  await page.click('[data-testid="submit"]')
  
  await expect(page).toHaveURL('/auth/login')
  await expect(page.locator('[data-testid="login-form"]')).toBeVisible()
})
```

## 📊 Estados da Página

### Loading
- Formulário carregando
- Estados de validação
- Feedback visual

### Sucesso
- Redirecionamento para login
- Feedback discreto
- Limpeza do formulário

### Erro
- Mensagem de erro específica
- Formulário mantido
- Opção de tentar novamente

## 🔄 Fluxo de Navegação

1. **Acesso**: Usuário acessa `/auth/register`
2. **Verificação**: Middleware verifica se já está autenticado
3. **Renderização**: Página é renderizada com formulário
4. **Preenchimento**: Usuário preenche dados pessoais
5. **Validação**: Validação client-side com Zod
6. **Envio**: Dados enviados para Better Auth
7. **Registro**: Servidor cria nova conta
8. **Redirecionamento**: Usuário é redirecionado para login

## 📋 Campos do Formulário

### Nome
- **Tipo**: Texto
- **Validação**: Obrigatório, mínimo 2 caracteres
- **Placeholder**: "Seu nome completo"

### Email
- **Tipo**: Email
- **Validação**: Obrigatório, formato válido, único
- **Placeholder**: "seu@email.com"

### Senha
- **Tipo**: Password
- **Validação**: Obrigatório, mínimo 6 caracteres, regras de segurança
- **Placeholder**: "Sua senha"

### Confirmar Senha
- **Tipo**: Password
- **Validação**: Obrigatório, deve coincidir com senha
- **Placeholder**: "Confirme sua senha"

## 📚 Documentação Relacionada

- **[RegisterForm](../components/auth/register-form.md)** - Componente de formulário
- **[Login Page](login.md)** - Página de login
- **[Better Auth Setup](../../BETTER_AUTH_SETUP.md)** - Configuração do sistema
- **[Middleware](../../middleware.md)** - Proteção de rotas

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
