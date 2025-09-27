# Auth Utils - Utilitários de Autenticação

Utilitários para operações de autenticação no cliente e servidor com Supabase.

## 📋 Visão Geral

O arquivo `lib/auth/utils.ts` fornece utilitários centralizados para operações de autenticação, separando lógica de cliente e servidor para melhor organização e reutilização.

## 🎯 Funcionalidades

- **Operações de Cliente**: Login, logout, registro no browser
- **Operações de Servidor**: Autenticação em Server Components
- **Gerenciamento de Perfil**: Dados completos do usuário
- **Verificações de Permissão**: Admin e autenticação
- **Tratamento de Erros**: Padronizado para todas as operações

## 📦 Importação

```tsx
// Cliente
import { authClient } from '@/lib/auth/utils'

// Servidor
import { authServer } from '@/lib/auth/utils'
```

## 🚀 Utilitários do Cliente

### authClient

Utilitários para operações de autenticação no lado do cliente.

#### Métodos Disponíveis

##### signIn(email, password)
```tsx
const result = await authClient.signIn('user@example.com', 'password123')
```

**Retorno:**
```typescript
{
  user: User | null
  error: string | null
}
```

##### signUp(email, password)
```tsx
const result = await authClient.signUp('user@example.com', 'password123')
```

**Retorno:**
```typescript
{
  user: User | null
  error: string | null
}
```

##### signOut()
```tsx
const result = await authClient.signOut()
```

**Retorno:**
```typescript
{
  error: string | null
}
```

##### getCurrentUser()
```tsx
const result = await authClient.getCurrentUser()
```

**Retorno:**
```typescript
{
  user: User | null
  error: string | null
}
```

##### getCurrentSession()
```tsx
const result = await authClient.getCurrentSession()
```

**Retorno:**
```typescript
{
  session: Session | null
  error: string | null
}
```

##### resetPassword(email)
```tsx
const result = await authClient.resetPassword('user@example.com')
```

**Retorno:**
```typescript
{
  error: string | null
}
```

##### updatePassword(password)
```tsx
const result = await authClient.updatePassword('newpassword123')
```

**Retorno:**
```typescript
{
  error: string | null
}
```

## 🚀 Utilitários do Servidor

### authServer

Utilitários para operações de autenticação no lado do servidor.

#### Métodos Disponíveis

##### getCurrentUser()
```tsx
const { user, error } = await authServer.getCurrentUser()
```

**Retorno:**
```typescript
{
  user: User | null
  error: string | null
}
```

**Características:**
- Busca dados completos do perfil
- Inclui informações da tabela `profiles`
- Usado em Server Components

##### isAuthenticated()
```tsx
const isAuth = await authServer.isAuthenticated()
```

**Retorno:**
```typescript
boolean
```

##### isAdmin()
```tsx
const isAdmin = await authServer.isAdmin()
```

**Retorno:**
```typescript
boolean
```

## 🏗️ Implementação Interna

### Cliente (authClient)
```tsx
export const authClient = {
  async signIn(email: string, password: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  },
  // ... outros métodos
}
```

### Servidor (authServer)
```tsx
export const authServer = {
  async getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
    try {
      const supabase = await createServerSupabaseClient()
      
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        return { user: null, error: error.message }
      }

      if (!user) {
        return { user: null, error: 'Usuário não autenticado' }
      }

      // Buscar perfil do usuário
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        return { user: null, error: profileError.message }
      }

      const userWithProfile: User = {
        id: user.id,
        email: user.email!,
        full_name: profile?.full_name || null,
        avatar_url: profile?.avatar_url || null,
        role: profile?.role || 'user',
        created_at: user.created_at,
        updated_at: profile?.updated_at || user.updated_at,
      }

      return { user: userWithProfile, error: null }
    } catch (error) {
      return { 
        user: null, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      }
    }
  },
  // ... outros métodos
}
```

## 🚀 Exemplos de Uso

### Login no Cliente
```tsx
import { authClient } from '@/lib/auth/utils'
import { toast } from 'sonner'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await authClient.signIn(email, password)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Login realizado com sucesso!')
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

### Verificação no Servidor
```tsx
import { authServer } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const { user, error } = await authServer.getCurrentUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Bem-vindo, {user.full_name || user.email}!</p>
    </div>
  )
}
```

### Verificação de Admin
```tsx
import { authServer } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'

export default async function AdminPanel() {
  const isAdmin = await authServer.isAdmin()

  if (!isAdmin) {
    redirect('/dashboard')
  }

  return (
    <div>
      <h1>Painel Administrativo</h1>
      <p>Acesso restrito a administradores</p>
    </div>
  )
}
```

### Logout
```tsx
import { authClient } from '@/lib/auth/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await authClient.signOut()

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Logout realizado com sucesso!')
      router.push('/auth/login')
    }
  }

  return (
    <button onClick={handleLogout}>
      Sair
    </button>
  )
}
```

### Reset de Senha
```tsx
import { authClient } from '@/lib/auth/utils'
import { toast } from 'sonner'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await authClient.resetPassword(email)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Email de recuperação enviado!')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
```

## 🔧 Tipos de Dados

### User
```typescript
interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}
```

### AuthResponse
```typescript
interface AuthResponse {
  user: User | null
  error: string | null
}
```

## 📝 Notas de Implementação

### Dependências
- **Supabase Client**: Para operações no cliente
- **Supabase Server**: Para operações no servidor
- **Next.js Cookies**: Para gerenciamento de sessão

### Tratamento de Erros
- **Padronizado**: Todos os métodos retornam `{ data, error }`
- **Mensagens**: Erros em português quando possível
- **Fallbacks**: Tratamento de erros desconhecidos

### Segurança
- **Server Components**: Usar `authServer` em Server Components
- **Client Components**: Usar `authClient` em Client Components
- **Sessões**: Gerenciamento automático de cookies

## 🔮 Melhorias Futuras

- [ ] **Two-Factor Auth**: Suporte a 2FA
- [ ] **Social Login**: Integração com Google/GitHub
- [ ] **Refresh Tokens**: Renovação automática
- [ ] **Audit Log**: Log de operações de auth
- [ ] **Rate Limiting**: Proteção contra ataques

## 🧪 Testes

### Cenários de Teste
1. **Login**: Autenticação funciona corretamente
2. **Logout**: Desconexão limpa sessão
3. **Registro**: Criação de usuário funciona
4. **Reset**: Recuperação de senha funciona
5. **Permissões**: Verificações de admin funcionam
6. **Erros**: Tratamento adequado de erros

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: Supabase Auth, Next.js
