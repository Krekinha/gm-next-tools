# Supabase + Better Auth - Setup Completo

## 🎯 Objetivo

Criar todas as tabelas necessárias para o Better Auth no Supabase usando o MCP Supabase e métodos alternativos.

## 📋 Tabelas Necessárias

### 1. **users** - Tabela principal de usuários
- `id` (TEXT, UUID) - Chave primária
- `email` (TEXT) - Email único
- `name` (TEXT) - Nome do usuário
- `password` (TEXT) - Senha hasheada
- `role` (TEXT) - Papel do usuário (user, admin)
- `emailVerified` (BOOLEAN) - Status de verificação
- `image` (TEXT) - URL da imagem do perfil
- `createdAt` (TIMESTAMP) - Data de criação
- `updatedAt` (TIMESTAMP) - Data de atualização

### 2. **sessions** - Tabela de sessões
- `id` (TEXT, UUID) - Chave primária
- `userId` (TEXT) - Referência ao usuário
- `expiresAt` (TIMESTAMP) - Data de expiração
- `token` (TEXT) - Token único da sessão
- `createdAt` (TIMESTAMP) - Data de criação
- `updatedAt` (TIMESTAMP) - Data de atualização

### 3. **verifications** - Tabela de verificações
- `id` (TEXT, UUID) - Chave primária
- `identifier` (TEXT) - Identificador (email, telefone)
- `value` (TEXT) - Valor da verificação
- `expiresAt` (TIMESTAMP) - Data de expiração
- `createdAt` (TIMESTAMP) - Data de criação
- `updatedAt` (TIMESTAMP) - Data de atualização

## 🚀 Métodos de Setup

### Método 1: Script Automatizado (Recomendado)

```bash
# Execute o script que cria todas as tabelas automaticamente
pnpm setup-supabase-auth
```

**Requisitos:**
- Variáveis de ambiente configuradas:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Método 2: SQL Manual no Supabase

1. **Acesse o painel do Supabase**
2. **Vá para SQL Editor**
3. **Execute o arquivo:** `scripts/supabase-better-auth-setup.sql`

### Método 3: MCP Supabase (Se configurado)

Se você tiver o MCP Supabase configurado com token de acesso:

```bash
# Listar tabelas existentes
pnpm exec mcp-supabase list-tables

# Aplicar migração
pnpm exec mcp-supabase apply-migration --name better_auth_tables
```

## 🔧 Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-de-servico

# Better Auth Configuration
BETTER_AUTH_SECRET=seu-secret-key-aqui
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://postgres:[password]@db.seu-projeto.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[password]@db.seu-projeto.supabase.co:5432/postgres
```

## 📊 Verificação das Tabelas

### Query de Verificação

Execute esta query no SQL Editor do Supabase para verificar se as tabelas foram criadas:

```sql
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name IN ('users', 'sessions', 'verifications')
ORDER BY table_name, ordinal_position;
```

### Verificação via Script

```bash
# Verificar se as tabelas existem
pnpm exec mcp-supabase list-tables
```

## 🔒 Segurança (RLS - Row Level Security)

O script SQL inclui configurações de segurança:

### Políticas RLS Criadas

1. **Users**: Usuários podem ver apenas seus próprios dados
2. **Sessions**: Gerenciadas pelo Better Auth
3. **Verifications**: Gerenciadas pelo Better Auth

### Triggers Automáticos

- `updatedAt` é atualizado automaticamente em todas as tabelas
- Função `update_updated_at_column()` criada para isso

## 🐛 Troubleshooting

### Erro: "Cannot apply migration in read-only mode"

**Solução:** Use o método SQL manual no painel do Supabase.

### Erro: "Unauthorized. Please provide a valid access token"

**Solução:** 
1. Configure o token de acesso do Supabase
2. Ou use o método SQL manual

### Erro: "Table already exists"

**Solução:** O script usa `CREATE TABLE IF NOT EXISTS`, então é seguro executar novamente.

## 📋 Checklist de Verificação

### ✅ Antes de Executar
- [ ] Variáveis de ambiente configuradas
- [ ] Acesso ao painel do Supabase
- [ ] Service Role Key válida

### ✅ Após Executar
- [ ] Tabela `users` criada com todas as colunas
- [ ] Tabela `sessions` criada com foreign key
- [ ] Tabela `verifications` criada
- [ ] Índices criados para performance
- [ ] RLS habilitado e políticas criadas
- [ ] Triggers de `updatedAt` funcionando

## 🚀 Próximos Passos

Após criar as tabelas:

1. **Configure as variáveis de ambiente** do Better Auth
2. **Execute:** `pnpm dev`
3. **Teste o fluxo completo:**
   - Acesse `http://localhost:3000`
   - Crie uma conta em `/auth/register`
   - Faça login em `/auth/login`
   - Verifique o menu do usuário

## 📚 Recursos Adicionais

- [Better Auth Documentation](https://beta.better-auth.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma + Supabase Guide](https://supabase.com/docs/guides/integrations/prisma)

## 🆘 Suporte

Se encontrar problemas:

1. **Verifique os logs** do script
2. **Execute a query de verificação** no Supabase
3. **Use o método SQL manual** como alternativa
4. **Verifique as variáveis de ambiente**
