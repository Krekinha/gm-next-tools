# useAuth - Hooks de Autenticação

## 📋 Visão Geral

Hooks customizados para integração com Better Auth, fornecendo funcionalidades de autenticação de forma reativa e type-safe.

## 🎯 Funcionalidades

- **Sessão Reativa**: Hook para estado de sessão em tempo real
- **Operações de Auth**: Login, registro e logout
- **Estados de Loading**: Indicadores de carregamento
- **Tratamento de Erros**: Gerenciamento de erros de autenticação
- **Type Safety**: Tipagem completa com TypeScript

## 🛠️ Implementação

### Localização
```
hooks/use-auth.ts
```

### Dependências
- `better-auth/react` - Cliente de autenticação
- `better-auth` - Configuração do servidor

### Exports
```typescript
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',
})

export const { 
  signIn, 
  signUp, 
  signOut, 
  useSession, 
  getSession 
} = authClient
```

## 🪝 Hooks Disponíveis

### useSession
Hook para obter estado da sessão atual de forma reativa.

```typescript
const { data: session, isPending, error } = useSession()
```

**Retorno**:
- `data`: Dados da sessão ou `null`
- `isPending`: Estado de carregamento
- `error`: Erro de carregamento

**Exemplo de Uso**:
```tsx
function UserProfile() {
  const { data: session, isPending } = useSession()
  
  if (isPending) return <div>Carregando...</div>
  if (!session) return <div>Não autenticado</div>
  
  return <div>Olá, {session.user.name}!</div>
}
```

### signIn
Função para realizar login do usuário.

```typescript
const { signIn, isPending, error } = signIn({
  email: string,
  password: string
})
```

**Parâmetros**:
- `email`: Email do usuário
- `password`: Senha do usuário

**Retorno**:
- `isPending`: Estado de carregamento
- `error`: Erro de autenticação

**Exemplo de Uso**:
```tsx
function LoginForm() {
  const { signIn, isPending } = authClient
  
  const handleSubmit = async (data: LoginFormData) => {
    const result = await signIn({
      email: data.email,
      password: data.password
    })
    
    if (result.error) {
      setError(result.error.message)
    } else {
      router.push('/dashboard')
    }
  }
}
```

### signUp
Função para registrar novo usuário.

```typescript
const { signUp, isPending, error } = signUp({
  name: string,
  email: string,
  password: string
})
```

**Parâmetros**:
- `name`: Nome do usuário
- `email`: Email do usuário
- `password`: Senha do usuário

**Retorno**:
- `isPending`: Estado de carregamento
- `error`: Erro de registro

**Exemplo de Uso**:
```tsx
function RegisterForm() {
  const { signUp, isPending } = authClient
  
  const handleSubmit = async (data: RegisterFormData) => {
    const result = await signUp({
      name: data.name,
      email: data.email,
      password: data.password
    })
    
    if (result.error) {
      setError(result.error.message)
    } else {
      router.push('/auth/login')
    }
  }
}
```

### signOut
Função para realizar logout do usuário.

```typescript
const { signOut, isPending, error } = signOut()
```

**Retorno**:
- `isPending`: Estado de carregamento
- `error`: Erro de logout

**Exemplo de Uso**:
```tsx
function LogoutButton() {
  const { signOut, isPending } = authClient
  
  const handleLogout = async () => {
    await signOut()
    router.push('/auth/login')
  }
  
  return (
    <button onClick={handleLogout} disabled={isPending}>
      {isPending ? 'Saindo...' : 'Sair'}
    </button>
  )
}
```

### getSession
Função para obter sessão atual de forma síncrona.

```typescript
const session = await getSession()
```

**Retorno**: Dados da sessão ou `null`

**Exemplo de Uso**:
```tsx
// Em Server Components
async function ProtectedPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/auth/login')
  }
  
  return <div>Conteúdo protegido</div>
}
```

## 📊 Tipos TypeScript

### Session
```typescript
interface Session {
  user: {
    id: string
    name: string
    email: string
    role: 'user' | 'admin'
    image?: string
  }
  expiresAt: Date
}
```

### User
```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  image?: string
  createdAt: Date
  updatedAt: Date
}
```

## 🔧 Configuração

### Variáveis de Ambiente
```bash
# .env.local
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

### Cliente de Autenticação
```typescript
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',
})
```

## 🎯 Casos de Uso

### Proteção de Rotas
```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  
  if (isPending) return <div>Carregando...</div>
  if (!session) return <div>Acesso negado</div>
  
  return <>{children}</>
}
```

### Verificação de Role
```tsx
function AdminOnly({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  
  if (session?.user.role !== 'admin') {
    return <div>Acesso restrito a administradores</div>
  }
  
  return <>{children}</>
}
```

### Redirecionamento Condicional
```tsx
function ConditionalRedirect() {
  const { data: session } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }, [session, router])
  
  return <div>Redirecionando...</div>
}
```

## 🔒 Segurança

### Validação de Sessão
- Verificação automática de expiração
- Renovação automática de tokens
- Limpeza de sessões inválidas

### Proteção CSRF
- Tokens CSRF automáticos
- Validação de origem das requisições
- Headers de segurança

## 🧪 Testes

### Mock de Sessão
```typescript
// Para testes
const mockSession = {
  user: {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    role: 'user' as const
  },
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
}
```

### Testes de Hook
```typescript
import { renderHook } from '@testing-library/react'
import { useSession } from '@/hooks/use-auth'

test('should return session data', () => {
  const { result } = renderHook(() => useSession())
  
  expect(result.current.data).toBeDefined()
  expect(result.current.isPending).toBe(false)
})
```

## 📚 Documentação Relacionada

- **[Better Auth Setup](../../BETTER_AUTH_SETUP.md)** - Configuração do sistema de auth
- **[LoginForm](../components/auth/login-form.md)** - Formulário que usa signIn
- **[RegisterForm](../components/auth/register-form.md)** - Formulário que usa signUp
- **[UserMenu](../components/auth/user-menu.md)** - Componente que usa useSession

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
