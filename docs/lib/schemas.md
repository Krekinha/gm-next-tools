# schemas - Validação Zod

## 📋 Visão Geral

Schemas de validação Zod centralizados para formulários de autenticação e outras funcionalidades do projeto GM Tools.

## 🎯 Funcionalidades

- **Validação Robusta**: Schemas Zod para todos os formulários
- **Type Safety**: Tipos TypeScript inferidos automaticamente
- **Mensagens em Português**: Feedback claro para usuários brasileiros
- **Validação de Senha**: Regras de segurança para senhas
- **Reutilização**: Schemas compartilhados entre client e server

## 🛠️ Implementação

### Localização
```
lib/schemas/auth.ts
```

### Dependências
- `zod` - Biblioteca de validação
- `@hookform/resolvers/zod` - Resolver para React Hook Form

### Exports
```typescript
export const loginSchema = z.object({...})
export const registerSchema = z.object({...})
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
```

## 📝 Schemas Disponíveis

### Login Schema
```typescript
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})
```

**Validações**:
- Email obrigatório e formato válido
- Senha obrigatória com mínimo 6 caracteres
- Mensagens de erro em português

**Tipo Inferido**:
```typescript
type LoginFormData = {
  email: string
  password: string
}
```

### Register Schema
```typescript
export const registerSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  })
```

**Validações**:
- Nome obrigatório com mínimo 2 caracteres
- Email obrigatório e formato válido
- Senha com regras de segurança:
  - Mínimo 6 caracteres
  - Pelo menos 1 letra minúscula
  - Pelo menos 1 letra maiúscula
  - Pelo menos 1 número
- Confirmação de senha obrigatória
- Validação de correspondência de senhas

**Tipo Inferido**:
```typescript
type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}
```

## 🔒 Regras de Segurança

### Validação de Senha
```typescript
.regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'
)
```

**Regex Breakdown**:
- `^` - Início da string
- `(?=.*[a-z])` - Lookahead para pelo menos 1 letra minúscula
- `(?=.*[A-Z])` - Lookahead para pelo menos 1 letra maiúscula
- `(?=.*\d)` - Lookahead para pelo menos 1 dígito
- `.*` - Qualquer caractere
- `$` - Fim da string

### Validação de Email
```typescript
.email('Email inválido')
```

**Características**:
- Validação RFC 5322
- Aceita formatos padrão de email
- Rejeita emails malformados

## 🎯 Casos de Uso

### React Hook Form
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth'

function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  
  const onSubmit = (data: LoginFormData) => {
    // data é type-safe
    console.log(data.email, data.password)
  }
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* campos do formulário */}
    </form>
  )
}
```

### Validação Server-Side
```typescript
import { loginSchema } from '@/lib/schemas/auth'

export async function POST(request: Request) {
  const body = await request.json()
  
  try {
    const validatedData = loginSchema.parse(body)
    // validatedData é type-safe
    return Response.json({ success: true, data: validatedData })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ 
        success: false, 
        errors: error.errors 
      }, { status: 400 })
    }
  }
}
```

### Validação Manual
```typescript
import { registerSchema } from '@/lib/schemas/auth'

const result = registerSchema.safeParse(formData)

if (result.success) {
  // Dados válidos
  console.log(result.data)
} else {
  // Erros de validação
  console.log(result.error.errors)
}
```

## 📊 Mensagens de Erro

### Login
- `"Email é obrigatório"` - Campo email vazio
- `"Email inválido"` - Formato de email inválido
- `"Senha é obrigatória"` - Campo senha vazio
- `"Senha deve ter pelo menos 6 caracteres"` - Senha muito curta

### Registro
- `"Nome é obrigatório"` - Campo nome vazio
- `"Nome deve ter pelo menos 2 caracteres"` - Nome muito curto
- `"Email é obrigatório"` - Campo email vazio
- `"Email inválido"` - Formato de email inválido
- `"Senha é obrigatória"` - Campo senha vazio
- `"Senha deve ter pelo menos 6 caracteres"` - Senha muito curta
- `"Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número"` - Senha não atende critérios
- `"Confirmação de senha é obrigatória"` - Campo confirmação vazio
- `"Senhas não coincidem"` - Senhas diferentes

## 🔧 Customização

### Adicionar Novo Campo
```typescript
export const extendedLoginSchema = loginSchema.extend({
  rememberMe: z.boolean().optional(),
})
```

### Modificar Validação Existente
```typescript
export const strictPasswordSchema = z.string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 
    'Senha deve conter pelo menos uma letra minúscula, uma maiúscula, um número e um caractere especial'
  )
```

### Schema Condicional
```typescript
export const conditionalSchema = z.object({
  type: z.enum(['email', 'phone']),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
}).refine((data) => {
  if (data.type === 'email') return data.email
  if (data.type === 'phone') return data.phone
  return false
}, {
  message: 'Email ou telefone é obrigatório',
})
```

## 🧪 Testes

### Teste de Validação
```typescript
import { loginSchema } from '@/lib/schemas/auth'

describe('Login Schema', () => {
  it('should validate correct data', () => {
    const validData = {
      email: 'user@example.com',
      password: 'password123'
    }
    
    const result = loginSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })
  
  it('should reject invalid email', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123'
    }
    
    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    expect(result.error?.errors[0].message).toBe('Email inválido')
  })
})
```

### Teste de Tipo
```typescript
import type { LoginFormData } from '@/lib/schemas/auth'

// TypeScript deve inferir corretamente
const data: LoginFormData = {
  email: 'user@example.com',
  password: 'password123'
}
```

## 📚 Documentação Relacionada

- **[LoginForm](../components/auth/login-form.md)** - Formulário que usa loginSchema
- **[RegisterForm](../components/auth/register-form.md)** - Formulário que usa registerSchema
- **[Better Auth Setup](../../BETTER_AUTH_SETUP.md)** - Configuração do sistema de auth

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
