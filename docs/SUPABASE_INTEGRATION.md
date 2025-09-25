# 🚀 Integração Supabase + Prisma

Este documento descreve como configurar e usar o Supabase com Prisma no projeto GM Tools.

## 📋 Configuração Atual

### Tecnologias Utilizadas
- **Supabase** - Backend as a Service (PostgreSQL)
- **Prisma ORM** v6.16.2
- **@supabase/supabase-js** v2.57.4
- **PostgreSQL** como banco de dados

### Estrutura do Projeto
- **Schema**: `prisma/schema.prisma`
- **Cliente Prisma**: `lib/prisma.ts`
- **Cliente Supabase**: `lib/supabase.ts`
- **Scripts**: `scripts/setup-supabase.ts`, `scripts/migrate-to-supabase.ts`

## 🗄️ Schema do Banco (PostgreSQL)

### User (Usuário)
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
  @@map("users")
}
```

### Post (Postagem)
```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  @@map("posts")
}
```

## 🚀 Scripts Disponíveis

### Comandos Principais
```bash
# Configurar Supabase (cria arquivo .env)
pnpm setup-supabase

# Migrar schema para Supabase
pnpm migrate-supabase

# Testar conexão com banco
pnpm db:test

# Abrir Prisma Studio
pnpm db:studio

# Criar nova migração
pnpm db:migrate

# Gerar Prisma Client
pnpm db:generate
```

## ⚙️ Configuração do Ambiente

### 1. Arquivo .env
```env
# Supabase Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.gm-tools.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.gm-tools.supabase.co:5432/postgres"

# Supabase Project Settings
NEXT_PUBLIC_SUPABASE_URL="https://gm-tools.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# Prisma
PRISMA_GENERATE_DATAPROXY="true"
```

### 2. Obter Credenciais do Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Vá para o projeto `gm-tools`
3. Em **Settings > Database**, copie a **Connection string**
4. Em **Settings > API**, copie as chaves:
   - **anon/public key**
   - **service_role key**

## 💻 Como Usar

### 1. Usando Prisma Client
```typescript
import { prisma } from '@/lib/prisma'

// Criar usuário
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'Nome do Usuário',
  },
})

// Buscar usuários com posts
const usersWithPosts = await prisma.user.findMany({
  include: { posts: true },
})
```

### 2. Usando Supabase Client
```typescript
import { supabase } from '@/lib/supabase'

// Buscar usuários
const { data: users, error } = await supabase
  .from('users')
  .select('*')

// Criar usuário
const { data, error } = await supabase
  .from('users')
  .insert([
    { email: 'user@example.com', name: 'Nome do Usuário' }
  ])
```

## 🔄 Processo de Migração

### Passo 1: Configurar Ambiente
```bash
pnpm setup-supabase
```

### Passo 2: Editar .env
Substitua os valores no arquivo `.env`:
- `[YOUR-PASSWORD]` → Senha do banco
- `[YOUR-ANON-KEY]` → Chave anônima
- `[YOUR-SERVICE-ROLE-KEY]` → Chave de serviço

### Passo 3: Executar Migração
```bash
pnpm migrate-supabase
```

### Passo 4: Testar Conexão
```bash
pnpm db:test
```

## 🧪 Testando a Integração

### 1. Via Script
```bash
pnpm db:test
```

### 2. Via Interface Web
Acesse: `http://localhost:3000/examples/supabase`

### 3. Via Prisma Studio
```bash
pnpm db:studio
```

## 📁 Estrutura de Arquivos

```
prisma/
├── schema.prisma              # Schema do banco
└── migrations/                # Migrações
    └── [timestamp]_supabase_migration/
        └── migration.sql

lib/
├── prisma.ts                  # Cliente Prisma singleton
└── supabase.ts                # Cliente Supabase

scripts/
├── setup-supabase.ts          # Configuração inicial
├── migrate-to-supabase.ts     # Migração para Supabase
└── test-db-connection.ts      # Teste de conexão

app/examples/supabase/
└── page.tsx                   # Página de exemplo

components/examples/
└── supabase-example.tsx       # Componente de exemplo
```

## 🔍 Diferenças entre Prisma e Supabase Client

### Prisma Client
- ✅ Type-safe
- ✅ Relacionamentos automáticos
- ✅ Migrações versionadas
- ✅ Queries complexas
- ❌ Não tem recursos de auth/real-time

### Supabase Client
- ✅ Auth integrado
- ✅ Real-time subscriptions
- ✅ Storage
- ✅ Edge Functions
- ❌ Menos type-safe
- ❌ Sem relacionamentos automáticos

## 🚨 Troubleshooting

### Erro de Conexão
```bash
# Verificar variáveis de ambiente
echo $DATABASE_URL

# Regenerar Prisma Client
pnpm db:generate

# Testar conexão
pnpm db:test
```

### Erro de Migração
```bash
# Resetar migrações
npx prisma migrate reset

# Aplicar migrações
pnpm db:migrate
```

### Problemas de Permissão
- Verificar se as chaves do Supabase estão corretas
- Verificar políticas RLS (Row Level Security)
- Usar service_role key para operações administrativas

## 📝 Próximos Passos

1. **Autenticação**: Implementar auth com Supabase
2. **Real-time**: Adicionar subscriptions em tempo real
3. **Storage**: Configurar armazenamento de arquivos
4. **Edge Functions**: Criar funções serverless
5. **RLS**: Configurar Row Level Security
6. **Testes**: Adicionar testes automatizados

## 🎉 Status: CONFIGURADO

O Supabase está configurado e pronto para uso no projeto GM Tools!

### Benefícios da Integração:
- ✅ Banco PostgreSQL gerenciado
- ✅ APIs REST automáticas
- ✅ Dashboard web para gerenciamento
- ✅ Escalabilidade automática
- ✅ Backup automático
- ✅ Integração com Prisma ORM
