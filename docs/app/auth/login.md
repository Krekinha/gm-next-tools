# Página de Login

Página de autenticação para login de usuários na aplicação GM Tools.

## 📋 Visão Geral

A página de login (`app/auth/login/page.tsx`) é um componente cliente que fornece um formulário de autenticação completo com validação, estados de loading e feedback visual para o usuário.

## 🎯 Funcionalidades

- **Formulário de Login**: Email e senha com validação Zod
- **Validação em Tempo Real**: Feedback imediato de erros
- **Estados de Loading**: Indicadores visuais durante autenticação
- **Toggle de Senha**: Mostrar/ocultar senha
- **Redirecionamento**: Redireciona após login bem-sucedido
- **Feedback Visual**: Toasts para sucesso e erro
- **Acessibilidade**: Labels e ARIA adequados
- **Responsividade**: Design adaptável a diferentes telas

## 📦 Importação

```tsx
// Acessível via rota /auth/login
```

## 🚀 Estrutura do Componente

### Componente Principal
```tsx
export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginForm />
    </Suspense>
  )
}
```

### Componente Interno
```tsx
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, loading, error } = useAuthActions()
  
  const [showPassword, setShowPassword] = useState(false)
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn(data.email, data.password)
    
    if (result.success) {
      toast.success('Login realizado com sucesso!')
      router.push(redirectTo)
    } else {
      toast.error(result.error || 'Erro ao fazer login')
    }
  }

  // Renderização do formulário...
}
```

## 🎨 Design e Layout

### Estrutura Visual
```
┌─────────────────────────────────┐
│           Entrar                │
│   Digite suas credenciais       │
├─────────────────────────────────┤
│ Email: [________________]       │
│ Senha:  [________________] 👁️   │
│                                 │
│        [Entrar]                 │
│                                 │
│    Esqueceu sua senha?          │
│    Não tem conta? Criar conta   │
└─────────────────────────────────┘
```

### Estados Visuais
- **Normal**: Formulário padrão
- **Loading**: Botão com spinner e campos desabilitados
- **Erro**: Mensagens de erro em vermelho
- **Sucesso**: Toast de confirmação

## 🔧 Funcionalidades Detalhadas

### Validação de Formulário
```tsx
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres'),
})
```

### Toggle de Senha
```tsx
const [showPassword, setShowPassword] = useState(false)

<Button
  type="button"
  variant="ghost"
  size="sm"
  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
  onClick={() => setShowPassword(!showPassword)}
  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
>
  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
</Button>
```

### Redirecionamento Inteligente
```tsx
const redirectTo = searchParams.get('redirectTo') || '/dashboard'

// Após login bem-sucedido
router.push(redirectTo)
```

## 🚀 Exemplos de Uso

### Acesso Direto
```tsx
// Navegação programática
router.push('/auth/login')

// Com redirecionamento
router.push('/auth/login?redirectTo=/profile')
```

### Integração com Middleware
```tsx
// middleware.ts
if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
  return NextResponse.redirect(new URL('/auth/login?redirectTo=/dashboard', request.url))
}
```

## 🔧 Tecnologias Utilizadas

- **React Hook Form**: Gerenciamento de formulário
- **Zod**: Validação de dados
- **Supabase Auth**: Autenticação
- **Sonner**: Notificações toast
- **Lucide React**: Ícones
- **Shadcn UI**: Componentes de interface

## 📱 Responsividade

- **Desktop**: Layout centralizado
- **Tablet**: Adaptação automática
- **Mobile**: Layout otimizado para touch

## ♿ Acessibilidade

- **Labels**: Labels adequados para todos os campos
- **ARIA**: Atributos ARIA para screen readers
- **Navegação**: Suporte completo a teclado
- **Contraste**: Cores com contraste adequado
- **Estados**: Feedback visual para todos os estados

## 🔄 Fluxo de Autenticação

### 1. Carregamento da Página
```tsx
<Suspense fallback={<LoadingFallback />}>
  <LoginForm />
</Suspense>
```

### 2. Preenchimento do Formulário
- Validação em tempo real
- Feedback visual de erros
- Toggle de senha disponível

### 3. Submissão
```tsx
const onSubmit = async (data: LoginFormData) => {
  const result = await signIn(data.email, data.password)
  
  if (result.success) {
    toast.success('Login realizado com sucesso!')
    router.push(redirectTo)
  } else {
    toast.error(result.error || 'Erro ao fazer login')
  }
}
```

### 4. Redirecionamento
- Sucesso: Redireciona para página desejada
- Erro: Mantém na página com feedback

## 📝 Notas de Implementação

### Suspense Boundary
```tsx
<Suspense fallback={
  <Card className="w-full">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl text-center">Entrar</CardTitle>
      <CardDescription className="text-center">Carregando...</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="h-10 bg-muted animate-pulse rounded" />
        <div className="h-10 bg-muted animate-pulse rounded" />
        <div className="h-10 bg-muted animate-pulse rounded" />
      </div>
    </CardContent>
  </Card>
}>
  <LoginForm />
</Suspense>
```

### Tratamento de Erros
```tsx
{error && (
  <div className="rounded-md bg-destructive/15 p-3">
    <p className="text-sm text-destructive">{error}</p>
  </div>
)}
```

### Estados de Loading
```tsx
<Button 
  type="submit" 
  className="w-full" 
  disabled={loading}
>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Entrando...
    </>
  ) : (
    'Entrar'
  )}
</Button>
```

## 🔮 Melhorias Futuras

- [ ] **Two-Factor Auth**: Suporte a 2FA
- [ ] **Social Login**: Login com Google/GitHub
- [ ] **Remember Me**: Opção de lembrar usuário
- [ ] **Biometria**: Login com impressão digital
- [ ] **Rate Limiting**: Proteção contra ataques
- [ ] **Captcha**: Proteção adicional

## 🧪 Testes

### Cenários de Teste
1. **Login Válido**: Email e senha corretos
2. **Login Inválido**: Email ou senha incorretos
3. **Validação**: Campos obrigatórios
4. **Redirecionamento**: Após login bem-sucedido
5. **Estados**: Loading e erro funcionam
6. **Acessibilidade**: Navegação por teclado
7. **Responsividade**: Funciona em diferentes telas

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: React Hook Form, Zod, Supabase Auth, Sonner
