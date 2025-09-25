# Better Auth - Troubleshooting

## 🚨 Problema: Erro de Migração

### Erro Encontrado
```
Error: P3006
Migration `20250125000000_better_auth_setup` failed to apply cleanly to the shadow database.
Error code: P1014
The underlying table for model `users` does not exist.
```

### 🔧 Soluções

#### Solução 1: Reset Completo do Banco (Recomendado)

```bash
# 1. Resetar completamente o banco de dados
pnpm dlx prisma migrate reset --force

# 2. Gerar cliente Prisma
pnpm db:generate

# 3. Aplicar migrações
pnpm db:migrate
```

#### Solução 2: Script Automatizado

```bash
# Execute o script que faz tudo automaticamente
pnpm reset-auth
```

#### Solução 3: Migração Manual no Supabase

Se as soluções acima não funcionarem:

1. **Execute o script de migração manual:**
   ```bash
   pnpm apply-migration
   ```

2. **Copie o SQL gerado e execute no Supabase:**
   - Acesse o painel do Supabase
   - Vá para SQL Editor
   - Cole o conteúdo da migração
   - Execute

#### Solução 4: Verificar Conexão

Se houver problemas de conexão:

1. **Verifique as variáveis de ambiente:**
   ```bash
   pnpm test-auth
   ```

2. **Confirme as URLs do banco:**
   - `DATABASE_URL` - URL principal do Supabase
   - `DIRECT_URL` - URL direta do Supabase

3. **Teste a conexão:**
   ```bash
   pnpm db:test
   ```

## 📋 Checklist de Verificação

### ✅ Antes de Executar
- [ ] Variáveis de ambiente configuradas no `.env.local`
- [ ] Conexão com Supabase funcionando
- [ ] Backup do banco de dados (se necessário)

### ✅ Após Executar
- [ ] Migrações aplicadas com sucesso
- [ ] Cliente Prisma gerado
- [ ] Servidor de desenvolvimento iniciando sem erros
- [ ] Páginas de login/registro acessíveis

## 🐛 Problemas Comuns

### 1. Erro de Conexão com Banco
```
Error: P1001: Can't reach database server
```

**Solução:**
- Verifique se o Supabase está ativo
- Confirme as URLs no `.env.local`
- Teste a conexão com `pnpm db:test`

### 2. Tabela Users Não Existe
```
Error: P1014: The underlying table for model `users` does not exist
```

**Solução:**
- Execute `pnpm reset-auth`
- Ou aplique a migração manual

### 3. Erro de Shadow Database
```
Error: P3006: Migration failed to apply cleanly to the shadow database
```

**Solução:**
- Execute `pnpm dlx prisma migrate reset --force`
- Ou use o script automatizado

### 4. Foreign Key Constraints
```
Error: Foreign key constraint fails
```

**Solução:**
- A migração manual lida com isso automaticamente
- Ou execute o reset completo

## 🚀 Após Correção

### 1. Testar a Implementação
```bash
pnpm dev
```

### 2. Verificar Funcionalidades
- [ ] Acessar `http://localhost:3000` (deve redirecionar para login)
- [ ] Criar uma conta em `/auth/register`
- [ ] Fazer login em `/auth/login`
- [ ] Verificar menu do usuário no topbar
- [ ] Testar logout

### 3. Verificar Banco de Dados
```bash
pnpm db:studio
```

## 📞 Suporte

Se os problemas persistirem:

1. **Verifique os logs:**
   - Console do navegador
   - Terminal do servidor
   - Logs do Supabase

2. **Execute diagnósticos:**
   ```bash
   pnpm test-auth
   pnpm db:test
   ```

3. **Documente o erro:**
   - Copie a mensagem de erro completa
   - Inclua as variáveis de ambiente (sem valores sensíveis)
   - Descreva os passos que levaram ao erro
