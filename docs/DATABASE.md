# Database - Prisma Setup

Este documento descreve a configuração e uso do Prisma no projeto GM Tools.

## 📋 Configuração Atual

### Tecnologias Utilizadas
- **Prisma ORM** v6.16.2
- **SQLite** como banco de dados
- **TypeScript** para type safety

### Estrutura do Banco
- **Arquivo do banco**: `prisma/dev.db`
- **Schema**: `prisma/schema.prisma`
- **Client**: `lib/prisma.ts`

## 🗄️ Modelos Disponíveis

### User (Usuário)
```typescript
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}
```

### Post (Postagem)
```typescript
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
}
```

## 🚀 Scripts Disponíveis

### Comandos Principais
```bash
# Testar conexão com o banco
pnpm db:test

# Abrir Prisma Studio (interface visual)
pnpm db:studio

# Criar nova migração
pnpm db:migrate

# Gerar Prisma Client
pnpm db:generate
```

## 💻 Como Usar

### 1. Importar o Client
```typescript
import { prisma } from '@/lib/prisma'
```

### 2. Exemplos de Uso

#### Criar um usuário
```typescript
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'Nome do Usuário',
  },
})
```

#### Buscar usuário com posts
```typescript
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },
})
```

#### Criar um post
```typescript
const post = await prisma.post.create({
  data: {
    title: 'Título do Post',
    content: 'Conteúdo do post...',
    published: true,
    authorId: user.id,
  },
})
```

#### Buscar posts publicados
```typescript
const publishedPosts = await prisma.post.findMany({
  where: { published: true },
  include: { author: true },
})
```

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente
O projeto está configurado para usar SQLite localmente. Para produção, você pode:

1. Criar um arquivo `.env`:
```env
DATABASE_URL="file:./dev.db"
```

2. Para outros bancos, modifique o `datasource` no `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql" // ou "mysql", "sqlserver"
  url      = env("DATABASE_URL")
}
```

## 📁 Estrutura de Arquivos

```
prisma/
├── schema.prisma          # Schema do banco
├── dev.db                 # Banco SQLite
└── migrations/            # Migrações
    └── 20250925014200_init/
        └── migration.sql

lib/
└── prisma.ts              # Client singleton

scripts/
└── test-db-connection.ts  # Script de teste
```

## 🧪 Testando a Conexão

Execute o script de teste para verificar se tudo está funcionando:

```bash
pnpm db:test
```

Este script irá:
- ✅ Testar a conexão com o banco
- ✅ Criar dados de exemplo
- ✅ Testar relacionamentos
- ✅ Mostrar estatísticas

## 🔍 Prisma Studio

Para visualizar e gerenciar dados através de uma interface web:

```bash
pnpm db:studio
```

Acesse `http://localhost:5555` no seu navegador.

## 📝 Próximos Passos

1. **Adicionar mais modelos** conforme necessário
2. **Implementar validação** com Zod
3. **Criar APIs** para CRUD operations
4. **Adicionar testes** automatizados
5. **Configurar seeding** para dados iniciais

## 🚨 Troubleshooting

### Erro de conexão
- Verifique se o arquivo `prisma/dev.db` existe
- Execute `pnpm db:generate` para regenerar o client

### Erro de migração
- Execute `pnpm db:migrate` para aplicar migrações pendentes
- Verifique se o schema está correto

### Problemas de tipos
- Execute `pnpm db:generate` após mudanças no schema
- Reinicie o servidor de desenvolvimento

