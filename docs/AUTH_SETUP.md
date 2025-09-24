# Setup de Autenticação - Better Auth

Este documento descreve como configurar e usar o sistema de autenticação implementado com Better Auth.

## 🚀 Configuração Inicial

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e configure as variáveis:

```bash
cp .env.example .env.local
```

**Variáveis obrigatórias:**
- `AUTH_SECRET`: Chave secreta para assinatura de tokens (gere uma chave forte)
- `DATABASE_URL`: URL de conexão com o banco PostgreSQL
- `AUTH_BASE_URL`: URL base da aplicação (http://localhost:3000 para desenvolvimento)

### 2. Banco de Dados

#### Opção 1: PostgreSQL Local
```bash
# Instalar PostgreSQL (Ubuntu/Debian)
sudo apt install postgresql postgresql-contrib

# Criar banco de dados
sudo -u postgres createdb gm_tools_db
```

#### Opção 2: Supabase (Recomendado)
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie a URL de conexão do banco
4. Atualize `DATABASE_URL` no `.env.local`

### 3. Configurar Banco de Dados

```bash
# Gerar cliente Prisma
pnpm db:generate

# Aplicar migrações (cria as tabelas)
pnpm db:migrate

# Ou usar push para desenvolvimento
pnpm db:push
```

### 4. Criar Usuário Admin

```bash
# Executar script para criar usuário admin
pnpm create-admin
```

**Credenciais padrão:**
- Email: `admin@gmtools.com`
- Senha: `admin123`

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Banco de dados
pnpm db:generate    # Gerar cliente Prisma
pnpm db:push        # Sincronizar schema com banco
pnpm db:migrate     # Aplicar migrações
pnpm db:studio      # Interface visual do banco

# Criar usuário admin
pnpm create-admin
```

## 🛡️ Funcionalidades Implementadas

### Autenticação
- ✅ Login com email/senha
- ✅ Sessões persistentes (7 dias)
- ✅ Logout seguro
- ✅ Middleware de proteção de rotas

### Autorização
- ✅ Proteção de todas as rotas (exceto `/auth/*`)
- ✅ Redirecionamento automático para login
- ✅ Dois níveis de acesso (user, admin)

### UI/UX
- ✅ Página de login responsiva
- ✅ Integração com layout existente
- ✅ Loading states e error handling
- ✅ Informações do usuário no topbar
- ✅ Botão de logout

## 📁 Estrutura de Arquivos

```
├── app/
│   ├── api/auth/[...all]/route.ts    # API routes do Better Auth
│   ├── auth/
│   │   ├── layout.tsx                # Layout para páginas de auth
│   │   └── login/page.tsx            # Página de login
│   └── layout.tsx                    # Layout principal (atualizado)
├── components/layout/
│   └── app-topbar.tsx                # Topbar com info do usuário
├── hooks/
│   └── use-auth.ts                   # Hooks do Better Auth
├── lib/
│   └── auth.ts                       # Configuração do Better Auth
├── providers/
│   └── auth-provider.tsx             # Provider de autenticação
├── prisma/
│   └── schema.prisma                 # Schema do banco de dados
├── scripts/
│   └── create-admin.ts               # Script para criar admin
└── middleware.ts                     # Middleware de proteção
```

## 🔒 Segurança

### Produção
- ✅ Use `AUTH_SECRET` forte (mínimo 32 caracteres)
- ✅ Configure `AUTH_TRUSTED_HOSTS` com domínios válidos
- ✅ Use HTTPS em produção
- ✅ Configure `requireEmailVerification: true` em produção

### Desenvolvimento
- ✅ Credenciais padrão para facilitar desenvolvimento
- ✅ `requireEmailVerification: false` para desenvolvimento

## 🚨 Troubleshooting

### Erro de Conexão com Banco
```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Testar conexão
psql -h localhost -U postgres -d gm_tools_db
```

### Erro de Migração
```bash
# Resetar banco (CUIDADO: apaga todos os dados)
pnpm db:push --force-reset
```

### Problemas de Sessão
- Limpe cookies do navegador
- Verifique se `AUTH_SECRET` está configurado
- Confirme se `AUTH_BASE_URL` está correto

## 📝 Próximos Passos

1. **Fase 2**: Páginas de autenticação adicionais
   - Página de registro
   - Recuperação de senha
   - Verificação de email

2. **Fase 3**: Funcionalidades avançadas
   - Perfil do usuário
   - Gestão de usuários (admin)
   - Logs de auditoria

3. **Fase 4**: Melhorias de UX
   - Loading states mais sofisticados
   - Animações de transição
   - Feedback visual aprimorado