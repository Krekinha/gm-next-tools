# Auth Schemas - Schemas de Validação

Schemas Zod para validação de dados de autenticação e tipos TypeScript relacionados.

## 📋 Visão Geral

O arquivo `lib/schemas/auth.ts` contém todos os schemas de validação Zod para operações de autenticação, incluindo login, registro, perfil e alteração de senha, além dos tipos TypeScript correspondentes.

## 🎯 Funcionalidades

- **Validação de Login**: Schema para dados de login
- **Validação de Registro**: Schema para criação de usuário
- **Validação de Perfil**: Schema para dados do perfil
- **Validação de Senha**: Schema para alteração de senha
- **Tipos TypeScript**: Interfaces inferidas dos schemas
- **Mensagens em Português**: Validações com mensagens localizadas

## 📦 Importação

```tsx
import { 
  loginSchema, 
  registerSchema, 
  profileSchema, 
  changePasswordSchema,
  type LoginFormData,
  type RegisterFormData,
  type ProfileFormData,
  type ChangePasswordFormData,
  type User,
  type AuthResponse
} from '@/lib/schemas/auth'
```

## 🚀 Schemas Disponíveis

### loginSchema

Schema para validação de dados de login.

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

**Validações:**
- Email obrigatório e formato válido
- Senha entre 6 e 100 caracteres

### registerSchema

Schema para validação de dados de registro.

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

**Validações:**
- Email obrigatório e formato válido
- Senha forte (minúscula, maiúscula, número)
- Confirmação de senha deve coincidir

### profileSchema

Schema para validação de dados do perfil.

```tsx
const profileSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Nome completo é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  avatar_url: z
    .string()
    .url('URL do avatar deve ser válida')
    .optional()
    .or(z.literal('')),
})
```

**Validações:**
- Nome completo obrigatório (1-100 caracteres)
- URL do avatar opcional mas deve ser válida

### changePasswordSchema

Schema para validação de alteração de senha.

```tsx
const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Senha atual é obrigatória'),
  newPassword: z
    .string()
    .min(6, 'Nova senha deve ter pelo menos 6 caracteres')
    .max(100, 'Nova senha deve ter no máximo 100 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Nova senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'
    ),
  confirmNewPassword: z
    .string()
    .min(1, 'Confirmação da nova senha é obrigatória'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Novas senhas não coincidem',
  path: ['confirmNewPassword'],
})
```

**Validações:**
- Senha atual obrigatória
- Nova senha forte (minúscula, maiúscula, número)
- Confirmação deve coincidir

## 🚀 Exemplos de Uso

### Validação de Formulário de Login
```tsx
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    console.log('Dados validados:', data)
    // Processar login...
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <span className="error">{errors.email.message}</span>
        )}
      </div>
      
      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Senha"
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>
      
      <button type="submit">Entrar</button>
    </form>
  )
}
```

### Validação de Formulário de Registro
```tsx
import { registerSchema, type RegisterFormData } from '@/lib/schemas/auth'

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = registerSchema.parse(formData)
      console.log('Dados validados:', validatedData)
      // Processar registro...
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Senha"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      
      <div>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          placeholder="Confirmar Senha"
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>
      
      <button type="submit">Registrar</button>
    </form>
  )
}
```

### Validação de Perfil
```tsx
import { profileSchema, type ProfileFormData } from '@/lib/schemas/auth'

export function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    avatar_url: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = profileSchema.parse(formData)
      console.log('Perfil validado:', validatedData)
      // Atualizar perfil...
    } catch (error) {
      console.error('Erro de validação:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={formData.full_name}
          onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
          placeholder="Nome Completo"
          required
        />
      </div>
      
      <div>
        <input
          type="url"
          value={formData.avatar_url || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
          placeholder="URL do Avatar (opcional)"
        />
      </div>
      
      <button type="submit">Salvar Perfil</button>
    </form>
  )
}
```

### Validação de Alteração de Senha
```tsx
import { changePasswordSchema, type ChangePasswordFormData } from '@/lib/schemas/auth'

export function ChangePasswordForm() {
  const [formData, setFormData] = useState<ChangePasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = changePasswordSchema.parse(formData)
      console.log('Senha validada:', validatedData)
      // Alterar senha...
    } catch (error) {
      console.error('Erro de validação:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="password"
          value={formData.currentPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
          placeholder="Senha Atual"
          required
        />
      </div>
      
      <div>
        <input
          type="password"
          value={formData.newPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
          placeholder="Nova Senha"
          required
        />
      </div>
      
      <div>
        <input
          type="password"
          value={formData.confirmNewPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
          placeholder="Confirmar Nova Senha"
          required
        />
      </div>
      
      <button type="submit">Alterar Senha</button>
    </form>
  )
}
```

## 🔧 Tipos TypeScript

### Tipos Inferidos dos Schemas
```typescript
type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>
type ProfileFormData = z.infer<typeof profileSchema>
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
```

### Interface User
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

### Interface AuthResponse
```typescript
interface AuthResponse {
  user: User | null
  error: string | null
}
```

## 📝 Notas de Implementação

### Dependências
- **Zod**: Biblioteca de validação
- **TypeScript**: Tipagem estática

### Padrões de Validação
- **Mensagens em Português**: Todas as mensagens localizadas
- **Validações Consistentes**: Padrões uniformes entre schemas
- **Regex para Senhas**: Validação de senhas fortes
- **Refinements**: Validações customizadas (confirmação de senha)

### Segurança
- **Validação de Senha**: Requisitos mínimos de segurança
- **Sanitização**: Validação de URLs e emails
- **Limites**: Tamanhos máximos para prevenir ataques

## 🔮 Melhorias Futuras

- [ ] **Validação de Email**: Verificação de domínio
- [ ] **Senhas Mais Fortes**: Mais requisitos de segurança
- [ ] **Validação de Avatar**: Verificação de URL de imagem
- [ ] **Schemas Condicionais**: Validações baseadas em contexto
- [ ] **Internacionalização**: Suporte a múltiplos idiomas

## 🧪 Testes

### Cenários de Teste
1. **Login Válido**: Email e senha corretos
2. **Login Inválido**: Email ou senha incorretos
3. **Registro Válido**: Todos os campos corretos
4. **Registro Inválido**: Senhas não coincidem
5. **Perfil Válido**: Nome e URL corretos
6. **Perfil Inválido**: URL inválida
7. **Senha Forte**: Requisitos atendidos
8. **Senha Fraca**: Requisitos não atendidos

### Exemplo de Teste
```tsx
import { loginSchema, registerSchema } from '@/lib/schemas/auth'

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'user@example.com',
        password: 'password123',
      }
      
      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      }
      
      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validData = {
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
      }
      
      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject mismatched passwords', () => {
      const invalidData = {
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'Different123',
      }
      
      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
```

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: Zod, TypeScript
