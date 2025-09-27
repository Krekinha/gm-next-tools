# Página de Registro

Página de criação de conta para novos usuários na aplicação GM Tools.

## 📋 Visão Geral

A página de registro (`app/auth/register/page.tsx`) é um componente cliente que fornece um formulário completo para criação de conta com validação robusta de senha, confirmação de senha e feedback visual adequado.

## 🎯 Funcionalidades

- **Formulário de Registro**: Email, senha e confirmação de senha
- **Validação de Senha Forte**: Requisitos mínimos de segurança
- **Confirmação de Senha**: Validação de senhas coincidentes
- **Estados de Loading**: Indicadores visuais durante criação
- **Toggle de Senhas**: Mostrar/ocultar senha e confirmação
- **Redirecionamento**: Redireciona para login após sucesso
- **Feedback Visual**: Toasts para sucesso e erro
- **Acessibilidade**: Labels e ARIA adequados
- **Responsividade**: Design adaptável a diferentes telas

## 📦 Importação

```tsx
// Acessível via rota /auth/register
```

## 🚀 Estrutura do Componente

### Componente Principal
```tsx
export default function RegisterPage() {
  const router = useRouter()
  const { signUp, loading, error } = useAuthActions()
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    const result = await signUp(data.email, data.password)
    
    if (result.success) {
      toast.success('Conta criada com sucesso! Verifique seu email para confirmar.')
      router.push('/auth/login')
    } else {
      toast.error(result.error || 'Erro ao criar conta')
    }
  }

  // Renderização do formulário...
}
```

## 🎨 Design e Layout

### Estrutura Visual
```
┌─────────────────────────────────┐
│        Criar Conta              │
│   Preencha os dados abaixo      │
├─────────────────────────────────┤
│ Email: [________________]       │
│ Senha:  [________________] 👁️   │
│ Confirmação: [__________] 👁️   │
│                                 │
│        [Criar Conta]            │
│                                 │
│    Já tem conta? Fazer login    │
└─────────────────────────────────┘
```

### Estados Visuais
- **Normal**: Formulário padrão
- **Loading**: Botão com spinner e campos desabilitados
- **Erro**: Mensagens de erro em vermelho
- **Sucesso**: Toast de confirmação e redirecionamento

## 🔧 Funcionalidades Detalhadas

### Validação de Formulário
```tsx
const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'
    ),
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})
```

### Toggle de Senhas
```tsx
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)

// Toggle para senha principal
<Button
  onClick={() => setShowPassword(!showPassword)}
  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
>
  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
</Button>

// Toggle para confirmação de senha
<Button
  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  aria-label={showConfirmPassword ? 'Ocultar confirmação' : 'Mostrar confirmação'}
>
  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
</Button>
```

### Validação de Senha Forte
```tsx
// Requisitos da senha:
// - Pelo menos 6 caracteres
// - Máximo 100 caracteres
// - Pelo menos uma letra minúscula
// - Pelo menos uma letra maiúscula
// - Pelo menos um número
// - Confirmação deve coincidir
```

## 🚀 Exemplos de Uso

### Acesso Direto
```tsx
// Navegação programática
router.push('/auth/register')
```

### Integração com Login
```tsx
// Link no formulário de login
<Button
  variant="link"
  onClick={() => router.push('/auth/register')}
>
  Criar conta
</Button>
```

## 🔧 Tecnologias Utilizadas

- **React Hook Form**: Gerenciamento de formulário
- **Zod**: Validação de dados
- **Supabase Auth**: Criação de conta
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

## 🔄 Fluxo de Registro

### 1. Preenchimento do Formulário
- Validação em tempo real
- Feedback visual de erros
- Toggle de senhas disponível
- Dica de requisitos de senha

### 2. Validação
```tsx
// Validações aplicadas:
// - Email obrigatório e formato válido
// - Senha forte (minúscula, maiúscula, número)
// - Confirmação de senha obrigatória
// - Senhas devem coincidir
```

### 3. Submissão
```tsx
const onSubmit = async (data: RegisterFormData) => {
  const result = await signUp(data.email, data.password)
  
  if (result.success) {
    toast.success('Conta criada com sucesso! Verifique seu email para confirmar.')
    router.push('/auth/login')
  } else {
    toast.error(result.error || 'Erro ao criar conta')
  }
}
```

### 4. Redirecionamento
- Sucesso: Redireciona para página de login
- Erro: Mantém na página com feedback

## 📝 Notas de Implementação

### Dica de Senha
```tsx
<p className="text-xs text-muted-foreground">
  A senha deve conter pelo menos 6 caracteres, incluindo uma letra minúscula, uma maiúscula e um número.
</p>
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
      Criando conta...
    </>
  ) : (
    'Criar Conta'
  )}
</Button>
```

### Validação de Confirmação
```tsx
// Validação customizada para confirmação de senha
.refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})
```

## 🔮 Melhorias Futuras

- [ ] **Verificação de Email**: Confirmação obrigatória
- [ ] **Social Login**: Registro com Google/GitHub
- [ ] **Validação de Domínio**: Restrições de email
- [ ] **Captcha**: Proteção contra bots
- [ ] **Termos de Uso**: Aceite obrigatório
- [ ] **Política de Privacidade**: Link para política

## 🧪 Testes

### Cenários de Teste
1. **Registro Válido**: Todos os campos corretos
2. **Email Inválido**: Formato incorreto
3. **Senha Fraca**: Não atende requisitos
4. **Senhas Diferentes**: Confirmação não coincide
5. **Campos Obrigatórios**: Validação de campos vazios
6. **Estados**: Loading e erro funcionam
7. **Acessibilidade**: Navegação por teclado
8. **Responsividade**: Funciona em diferentes telas

### Exemplos de Validação
```tsx
// Senha válida
'Password123' ✅

// Senha inválida (sem maiúscula)
'password123' ❌

// Senha inválida (sem número)
'Password' ❌

// Senha inválida (muito curta)
'Pass1' ❌
```

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: React Hook Form, Zod, Supabase Auth, Sonner
