# useAuth Hook

Hook customizado para gerenciamento de autenticação com Supabase na aplicação GM Tools.

## 📋 Visão Geral

O `useAuth` é um conjunto de hooks que fornece funcionalidades completas de autenticação, incluindo estado do usuário, perfil completo e ações de autenticação. Integra-se com Supabase Auth para gerenciamento de sessões.

## 🎯 Funcionalidades

- **Estado de Autenticação**: Monitoramento em tempo real do usuário
- **Perfil Completo**: Dados do usuário além da autenticação básica
- **Ações de Auth**: Login, logout, registro e recuperação de senha
- **Estados de Loading**: Feedback visual durante operações
- **Tratamento de Erros**: Gerenciamento centralizado de erros
- **Sincronização**: Atualizações automáticas de estado

## 📦 Importação

```tsx
import { useAuth, useUserProfile, useAuthActions } from '@/hooks/use-auth'
```

## 🚀 Hooks Disponíveis

### 1. useAuth

Hook principal para estado de autenticação básica.

```tsx
const { user, loading, error, isAuthenticated } = useAuth()
```

#### Retorno
```typescript
interface UseAuthReturn {
  user: User | null           // Usuário do Supabase
  loading: boolean            // Estado de carregamento
  error: string | null        // Erro atual
  isAuthenticated: boolean    // Se usuário está autenticado
}
```

#### Exemplo de Uso
```tsx
import { useAuth } from '@/hooks/use-auth'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!user) {
    return <div>Usuário não autenticado</div>
  }

  return <>{children}</>
}
```

### 2. useUserProfile

Hook para dados completos do perfil do usuário.

```tsx
const { profile, loading, error, isAuthenticated, isAdmin } = useUserProfile()
```

#### Retorno
```typescript
interface UseUserProfileReturn {
  profile: AppUser | null      // Perfil completo do usuário
  loading: boolean             // Estado de carregamento
  error: string | null         // Erro atual
  isAuthenticated: boolean     // Se usuário está autenticado
  isAdmin: boolean            // Se usuário é administrador
}
```

#### Exemplo de Uso
```tsx
import { useUserProfile } from '@/hooks/use-auth'

export function UserProfile() {
  const { profile, loading, isAdmin } = useUserProfile()

  if (loading) {
    return <div>Carregando perfil...</div>
  }

  return (
    <div>
      <h2>{profile?.full_name || 'Usuário'}</h2>
      <p>{profile?.email}</p>
      {isAdmin && <span>Administrador</span>}
    </div>
  )
}
```

### 3. useAuthActions

Hook para ações de autenticação (login, logout, etc.).

```tsx
const { signIn, signUp, signOut, resetPassword, loading, error } = useAuthActions()
```

#### Retorno
```typescript
interface UseAuthActionsReturn {
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<AuthResult>
  resetPassword: (email: string) => Promise<AuthResult>
  loading: boolean
  error: string | null
}

interface AuthResult {
  success: boolean
  user?: User
  error?: string
}
```

#### Exemplo de Uso
```tsx
import { useAuthActions } from '@/hooks/use-auth'

export function LoginForm() {
  const { signIn, loading, error } = useAuthActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn(email, password)
    
    if (result.success) {
      // Redirecionar ou mostrar sucesso
    } else {
      // Mostrar erro
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
```

## 🏗️ Implementação Interna

### useAuth
```tsx
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Obter sessão inicial
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          setError(error.message)
        } else {
          setUser(session?.user ?? null)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (event === 'SIGNED_OUT') {
          setError(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading, error, isAuthenticated: !!user }
}
```

### useUserProfile
```tsx
export function useUserProfile() {
  const [profile, setProfile] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          setError(error.message)
        } else {
          const userProfile: AppUser = {
            id: user.id,
            email: user.email!,
            full_name: data?.full_name || null,
            avatar_url: data?.avatar_url || null,
            role: data?.role || 'user',
            created_at: user.created_at,
            updated_at: data?.updated_at || user.updated_at,
          }
          setProfile(userProfile)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  return {
    profile,
    loading,
    error,
    isAuthenticated: !!profile,
    isAdmin: profile?.role === 'admin',
  }
}
```

## 🎯 Tipos de Dados

### AppUser (Perfil Completo)
```typescript
interface AppUser {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'admin' | 'user' | 'viewer'
  created_at: string
  updated_at: string
}
```

### AuthResult
```typescript
interface AuthResult {
  success: boolean
  user?: User
  error?: string
}
```

## 🔄 Estados e Ciclo de Vida

### Estados de Loading
- **useAuth**: Loading inicial e mudanças de estado
- **useUserProfile**: Loading ao buscar perfil
- **useAuthActions**: Loading durante operações

### Sincronização Automática
- **Auth State Changes**: Atualizações em tempo real
- **Profile Updates**: Recarregamento automático do perfil
- **Error Clearing**: Limpeza de erros em logout

## 📝 Notas de Implementação

### Dependências
- **Supabase Client**: Cliente para operações de auth
- **React Hooks**: useState, useEffect para gerenciamento de estado
- **TypeScript**: Tipagem completa para segurança

### Tratamento de Erros
```tsx
// Padrão consistente de tratamento de erros
try {
  // Operação
} catch (err) {
  const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
  setError(errorMessage)
  return { success: false, error: errorMessage }
}
```

### Cleanup de Subscriptions
```tsx
// Cleanup automático de listeners
return () => subscription.unsubscribe()
```

## 🚀 Exemplos de Uso Avançados

### Proteção de Rotas
```tsx
import { useAuth } from '@/hooks/use-auth'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    redirect('/auth/login')
  }

  return <>{children}</>
}
```

### Controle de Permissões
```tsx
import { useUserProfile } from '@/hooks/use-auth'

export function AdminPanel() {
  const { profile, isAdmin } = useUserProfile()

  if (!isAdmin) {
    return <div>Acesso negado</div>
  }

  return <div>Painel administrativo</div>
}
```

### Formulário de Login Completo
```tsx
import { useAuthActions } from '@/hooks/use-auth'
import { toast } from 'sonner'

export function LoginForm() {
  const { signIn, loading, error } = useAuthActions()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await signIn(formData.email, formData.password)
    
    if (result.success) {
      toast.success('Login realizado com sucesso!')
      router.push('/dashboard')
    } else {
      toast.error(result.error || 'Erro ao fazer login')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

## 🔮 Melhorias Futuras

- [ ] **Refresh Token**: Renovação automática de tokens
- [ ] **Two-Factor Auth**: Suporte a 2FA
- [ ] **Social Login**: Integração com Google/GitHub
- [ ] **Offline Support**: Funcionamento offline
- [ ] **Analytics**: Tracking de eventos de auth

## 🧪 Testes

### Cenários de Teste
1. **Login**: Autenticação funciona corretamente
2. **Logout**: Desconexão limpa estado
3. **Perfil**: Carregamento de dados do perfil
4. **Erros**: Tratamento adequado de erros
5. **Loading**: Estados de loading funcionam
6. **Sincronização**: Atualizações em tempo real

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: Supabase Auth, React Hooks
