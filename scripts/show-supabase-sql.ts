import { readFileSync } from 'fs'
import { join } from 'path'

function showSupabaseSQL() {
  console.log('📄 SQL para criar tabelas do Better Auth no Supabase')
  console.log('=' .repeat(60))
  console.log()
  
  try {
    // Ler o arquivo SQL
    const sqlPath = join(__dirname, 'supabase-better-auth-setup.sql')
    const sqlContent = readFileSync(sqlPath, 'utf-8')
    
    console.log(sqlContent)
    
    console.log()
    console.log('=' .repeat(60))
    console.log('📋 Instruções:')
    console.log('1. Acesse o painel do Supabase')
    console.log('2. Vá para SQL Editor')
    console.log('3. Cole o SQL acima')
    console.log('4. Execute o script')
    console.log('5. Verifique se as tabelas foram criadas')
    
  } catch (error) {
    console.error('❌ Erro ao ler arquivo SQL:', error)
    
    // Mostrar SQL básico se não conseguir ler o arquivo
    console.log('\n📄 SQL Básico para Better Auth:')
    console.log('=' .repeat(40))
    console.log(`
-- Criar tabela users
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela sessions
CREATE TABLE IF NOT EXISTS "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criar tabela verifications
CREATE TABLE IF NOT EXISTS "verifications" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users"("email");
CREATE INDEX IF NOT EXISTS "sessions_userId_idx" ON "sessions"("userId");
CREATE INDEX IF NOT EXISTS "sessions_token_idx" ON "sessions"("token");
CREATE INDEX IF NOT EXISTS "verifications_identifier_idx" ON "verifications"("identifier");
`)
  }
}

showSupabaseSQL()
