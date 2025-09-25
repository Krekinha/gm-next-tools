# Better Auth Setup - Variáveis de Ambiente

## Configuração Necessária

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-key-here-change-in-production
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Database Configuration (existing)
DATABASE_URL=your-database-url-here
DIRECT_URL=your-direct-url-here

# Supabase Configuration (existing)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
```

## Instruções

1. Copie o conteúdo acima para um arquivo `.env.local` na raiz do projeto
2. Substitua os valores pelos seus dados reais
3. Para `BETTER_AUTH_SECRET`, gere uma chave secreta forte (pode usar `openssl rand -base64 32`)
4. Para produção, use URLs HTTPS e chaves secretas seguras

## Segurança

- Nunca commite o arquivo `.env.local` no Git
- Use chaves secretas diferentes para desenvolvimento e produção
- Mantenha as chaves secretas em local seguro
