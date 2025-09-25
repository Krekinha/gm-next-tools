# Login Page - Página de Login

## 📋 Visão Geral

Página de login responsiva que utiliza o componente `LoginForm` para autenticação de usuários. Integrada com Better Auth e protegida por middleware.

## 🎯 Funcionalidades

- **Layout Responsivo**: Adaptado para mobile e desktop
- **Formulário Integrado**: Usa componente `LoginForm`
- **Redirecionamento**: Volta para página original após login
- **Proteção**: Middleware redireciona usuários já autenticados
- **Acessibilidade**: Navegação por teclado e screen readers

## 🛠️ Implementação

### Localização
```
app/auth/login/page.tsx
```

### Dependências
- `LoginForm` - Componente de formulário
- `Link` - Navegação do Next.js
- `ArrowLeft` - Ícone Lucide

### Estrutura
```typescript
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Entre na sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Digite seu email e senha para acessar
          </p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link
            href="/auth/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Criar conta
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
- **Card de Login**: Largura fixa (350px) em desktop
- **Cabeçalho**: Título e descrição centralizados
- **Formulário**: Componente `LoginForm` integrado
- **Link de Registro**: Navegação para página de registro

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
  if (session && request.nextUrl.pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}
```

### Redirecionamento Pós-Login
```typescript
// No LoginForm
const handleSubmit = async (data: LoginFormData) => {
  const result = await signIn({
    email: data.email,
    password: data.password
  })
  
  if (result.error) {
    setError(result.error.message)
  } else {
    // Redireciona para página original ou dashboard
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
    router.push(callbackUrl)
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

## 🎯 Casos de Uso

### Acesso Direto
```
GET /auth/login
```

### Redirecionamento de Middleware
```
GET /dashboard (sem autenticação)
→ Redirect para /auth/login
```

### Callback URL
```
GET /auth/login?callbackUrl=/documents
→ Após login, redireciona para /documents
```

### Usuário Já Autenticado
```
GET /auth/login (com sessão ativa)
→ Redirect para /dashboard
```

## 🔒 Segurança

### Proteção de Rotas
- Middleware verifica autenticação
- Redirecionamento automático
- Prevenção de acesso não autorizado

### Validação
- Validação client-side com Zod
- Validação server-side no Better Auth
- Sanitização de inputs

### Rate Limiting
- Proteção contra ataques de força bruta
- Limite de tentativas de login
- Bloqueio temporário após falhas

## 🧪 Testes

### Cenários de Teste
- [ ] Carregamento da página
- [ ] Preenchimento do formulário
- [ ] Login bem-sucedido
- [ ] Tratamento de erros
- [ ] Redirecionamento após login
- [ ] Responsividade em diferentes telas
- [ ] Acessibilidade com teclado

### Playwright
```typescript
test('should login successfully', async ({ page }) => {
  await page.goto('/auth/login')
  
  await page.fill('[data-testid="email"]', 'user@example.com')
  await page.fill('[data-testid="password"]', 'password123')
  await page.click('[data-testid="submit"]')
  
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
})
```

## 📊 Estados da Página

### Loading
- Formulário carregando
- Estados de validação
- Feedback visual

### Sucesso
- Redirecionamento automático
- Feedback discreto
- Limpeza do formulário

### Erro
- Mensagem de erro
- Formulário mantido
- Opção de tentar novamente

## 🔄 Fluxo de Navegação

1. **Acesso**: Usuário acessa `/auth/login`
2. **Verificação**: Middleware verifica se já está autenticado
3. **Renderização**: Página é renderizada com formulário
4. **Preenchimento**: Usuário preenche email e senha
5. **Validação**: Validação client-side com Zod
6. **Envio**: Dados enviados para Better Auth
7. **Autenticação**: Servidor valida credenciais
8. **Redirecionamento**: Usuário é redirecionado para dashboard

## 📚 Documentação Relacionada

- **[LoginForm](../components/auth/login-form.md)** - Componente de formulário
- **[Register Page](register.md)** - Página de registro
- **[Better Auth Setup](../../BETTER_AUTH_SETUP.md)** - Configuração do sistema
- **[Middleware](../../middleware.md)** - Proteção de rotas

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
