# auth - Configuração do Better Auth

## 📋 Visão Geral

Configuração central do Better Auth para o projeto GM Tools, incluindo adaptador Prisma, configurações de autenticação e tipos TypeScript.

## 🎯 Funcionalidades

- **Configuração Completa**: Setup do Better Auth com todas as opções
- **Adaptador Prisma**: Integração com banco PostgreSQL via Supabase
- **Autenticação Email/Senha**: Sistema de login tradicional
- **Campos Adicionais**: Role do usuário e outros campos customizados
- **Sessões Persistentes**: Gerenciamento seguro de sessões
- **Type Safety**: Tipos TypeScript exportados

## 🛠️ Implementação

### Localização
```
lib/auth.ts
```

### Dependências
- `better-auth` - Biblioteca principal
- `better-auth/adapters/prisma` - Adaptador Prisma
- `./prisma` - Cliente Prisma local

### Configuração Principal
```typescript
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // 1 dia
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        required: false,
      },
    },
  },
  plugins: [],
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
})
```

## 🔧 Configurações Detalhadas

### Database Adapter
```typescript
database: prismaAdapter(prisma, {
  provider: 'postgresql',
})
```

**Características**:
- Usa Prisma como ORM
- Conecta com PostgreSQL via Supabase
- Migrações automáticas
- Type safety completo

### Email and Password
```typescript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: false, // Para desenvolvimento
}
```

**Opções**:
- `enabled`: Habilita autenticação por email/senha
- `requireEmailVerification`: Requer verificação de email (desabilitado para desenvolvimento)

### Session Management
```typescript
session: {
  expiresIn: 60 * 60 * 24 * 7, // 7 dias em segundos
  updateAge: 60 * 60 * 24, // 1 dia em segundos
}
```

**Configurações**:
- `expiresIn`: Duração da sessão (7 dias)
- `updateAge`: Intervalo de renovação automática (1 dia)

### User Fields
```typescript
user: {
  additionalFields: {
    role: {
      type: 'string',
      defaultValue: 'user',
      required: false,
    },
  },
}
```

**Campos Adicionais**:
- `role`: Função do usuário (user/admin)
- `defaultValue`: Valor padrão 'user'
- `required`: Campo opcional

## 🔐 Segurança

### Secret Key
```typescript
secret: process.env.BETTER_AUTH_SECRET!
```

**Requisitos**:
- Chave secreta forte (32+ caracteres)
- Armazenada em variável de ambiente
- Nunca commitada no código

### Base URL
```typescript
baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000'
```

**Configuração**:
- URL base da aplicação
- Usado para callbacks e redirecionamentos
- Diferente para desenvolvimento/produção

## 📊 Tipos Exportados

### Session Type
```typescript
export type Session = typeof auth.$Infer.Session
```

**Estrutura**:
```typescript
interface Session {
  user: {
    id: string
    name: string
    email: string
    role: string
    image?: string
  }
  expiresAt: Date
}
```

### User Type
```typescript
export type User = typeof auth.$Infer.User
```

**Estrutura**:
```typescript
interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  emailVerified: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
}
```

## 🔧 Variáveis de Ambiente

### Obrigatórias
```bash
# .env.local
BETTER_AUTH_SECRET=your-32-character-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### Banco de Dados
```bash
DATABASE_URL="postgresql://user:pass@host:port/db"
DIRECT_URL="postgresql://user:pass@host:port/db"
```

### Supabase (Opcional)
```bash
NEXT_PUBLIC_SUPABASE_URL="https://project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## 🎯 Casos de Uso

### API Routes
```typescript
// app/api/auth/[...all]/route.ts
import { auth } from '@/lib/auth'

export const { GET, POST } = auth.handler
```

### Server Components
```typescript
import { auth } from '@/lib/auth'

async function ProtectedPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if (!session) {
    redirect('/auth/login')
  }
  
  return <div>Conteúdo protegido</div>
}
```

### Middleware
```typescript
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  })
  
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
```

## 🔄 Migrações do Banco

### Schema Prisma
```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  password      String
  role          String    @default("user")
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Aplicar Migrações
```bash
# Gerar migração
pnpm dlx prisma migrate dev --name better_auth_setup

# Aplicar migração
pnpm dlx prisma migrate deploy
```

## 🧪 Testes

### Configuração de Teste
```typescript
// Para testes, use configuração separada
export const testAuth = betterAuth({
  ...authConfig,
  secret: 'test-secret-key',
  baseURL: 'http://localhost:3001',
})
```

### Mock de Sessão
```typescript
const mockSession = {
  user: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user'
  },
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
}
```

## 📚 Documentação Relacionada

- **[Better Auth Setup](../../BETTER_AUTH_SETUP.md)** - Setup completo do sistema
- **[Prisma Setup](../../PRISMA_SETUP_SUMMARY.md)** - Configuração do banco
- **[Supabase Integration](../../SUPABASE_INTEGRATION.md)** - Integração com Supabase
- **[useAuth](../hooks/use-auth.md)** - Hooks de autenticação

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
