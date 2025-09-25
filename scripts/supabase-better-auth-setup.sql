-- =====================================================
-- Better Auth - Setup de Tabelas no Supabase
-- =====================================================
-- Execute este script no SQL Editor do Supabase
-- para criar todas as tabelas necessárias para o Better Auth

-- 1. Criar tabela users para Better Auth
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

-- 2. Criar tabela sessions para Better Auth
CREATE TABLE IF NOT EXISTS "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Criar tabela verifications para Better Auth
CREATE TABLE IF NOT EXISTS "verifications" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users"("email");
CREATE INDEX IF NOT EXISTS "sessions_userId_idx" ON "sessions"("userId");
CREATE INDEX IF NOT EXISTS "sessions_token_idx" ON "sessions"("token");
CREATE INDEX IF NOT EXISTS "verifications_identifier_idx" ON "verifications"("identifier");

-- 5. Atualizar tabela posts se existir para usar String no authorId
DO $$ 
BEGIN
    -- Verificar se a tabela posts existe
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts') THEN
        -- Adicionar nova coluna authorId_new se não existir
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'authorId_new') THEN
            ALTER TABLE "posts" ADD COLUMN "authorId_new" TEXT;
        END IF;
        
        -- Migrar dados existentes usando email como referência
        UPDATE "posts" SET "authorId_new" = (
            SELECT "id" FROM "users" 
            WHERE "users"."email" = (
                SELECT "email" FROM "users" 
                WHERE "users"."id"::text = "posts"."authorId"::text
            )
        ) WHERE "authorId_new" IS NULL;
        
        -- Remover foreign key antiga se existir
        ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_authorId_fkey";
        
        -- Remover coluna antiga e renomear nova
        ALTER TABLE "posts" DROP COLUMN IF EXISTS "authorId";
        ALTER TABLE "posts" RENAME COLUMN "authorId_new" TO "authorId";
        
        -- Adicionar nova foreign key
        ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- 6. Habilitar Row Level Security (RLS) para segurança
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "verifications" ENABLE ROW LEVEL SECURITY;

-- 7. Criar políticas RLS básicas para Better Auth
-- Política para users: usuários podem ver apenas seus próprios dados
CREATE POLICY "Users can view own data" ON "users"
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own data" ON "users"
    FOR UPDATE USING (auth.uid()::text = id);

-- Política para sessions: sessões são gerenciadas pelo Better Auth
CREATE POLICY "Sessions are managed by Better Auth" ON "sessions"
    FOR ALL USING (true);

-- Política para verifications: verificações são gerenciadas pelo Better Auth
CREATE POLICY "Verifications are managed by Better Auth" ON "verifications"
    FOR ALL USING (true);

-- 8. Criar função para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Criar triggers para atualizar updatedAt automaticamente
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "users"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON "sessions"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verifications_updated_at BEFORE UPDATE ON "verifications"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Verificação das tabelas criadas
-- =====================================================
-- Execute esta query para verificar se as tabelas foram criadas corretamente
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name IN ('users', 'sessions', 'verifications')
ORDER BY table_name, ordinal_position;
