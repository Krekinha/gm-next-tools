import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Configurações do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente necessárias:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL')
  console.error('   SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Cliente Supabase com service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function setupBetterAuthTables() {
  console.log('🚀 Configurando tabelas do Better Auth no Supabase...')
  
  try {
    // Ler o arquivo SQL
    const sqlPath = join(__dirname, 'supabase-better-auth-setup.sql')
    const sqlContent = readFileSync(sqlPath, 'utf-8')
    
    // Dividir o SQL em comandos individuais (removendo comentários e linhas vazias)
    const commands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'))
    
    console.log(`📄 Executando ${commands.length} comandos SQL...`)
    
    // Executar cada comando
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      if (command.trim()) {
        console.log(`   ${i + 1}/${commands.length}: Executando comando...`)
        
        const { error } = await supabase.rpc('exec_sql', { 
          sql_query: command + ';' 
        })
        
        if (error) {
          // Se a função exec_sql não existir, tentar método alternativo
          if (error.message.includes('function exec_sql')) {
            console.log('   ⚠️  Função exec_sql não encontrada, usando método alternativo...')
            
            // Tentar executar diretamente via REST API
            const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'apikey': supabaseServiceKey,
              },
              body: JSON.stringify({ sql_query: command + ';' })
            })
            
            if (!response.ok) {
              console.log(`   ⚠️  Comando ${i + 1} pode ter falhado, mas continuando...`)
            }
          } else {
            console.log(`   ⚠️  Erro no comando ${i + 1}: ${error.message}`)
          }
        } else {
          console.log(`   ✅ Comando ${i + 1} executado com sucesso`)
        }
      }
    }
    
    console.log('\n✅ Setup concluído!')
    console.log('\n📋 Próximos passos:')
    console.log('1. Verifique as tabelas no painel do Supabase')
    console.log('2. Configure as variáveis de ambiente do Better Auth')
    console.log('3. Execute: pnpm dev')
    console.log('4. Teste o fluxo de login/registro')
    
  } catch (error) {
    console.error('❌ Erro durante o setup:', error)
    console.log('\n🔧 Solução alternativa:')
    console.log('1. Acesse o painel do Supabase')
    console.log('2. Vá para SQL Editor')
    console.log('3. Execute o arquivo: scripts/supabase-better-auth-setup.sql')
  }
}

// Função alternativa usando SQL direto
async function setupBetterAuthTablesDirect() {
  console.log('🚀 Configurando tabelas do Better Auth (método direto)...')
  
  const sqlCommands = [
    // Criar tabela users
    `CREATE TABLE IF NOT EXISTS "users" (
      "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "email" TEXT NOT NULL UNIQUE,
      "name" TEXT,
      "password" TEXT NOT NULL,
      "role" TEXT NOT NULL DEFAULT 'user',
      "emailVerified" BOOLEAN NOT NULL DEFAULT false,
      "image" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Criar tabela sessions
    `CREATE TABLE IF NOT EXISTS "sessions" (
      "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "userId" TEXT NOT NULL,
      "expiresAt" TIMESTAMP(3) NOT NULL,
      "token" TEXT NOT NULL UNIQUE,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
    )`,
    
    // Criar tabela verifications
    `CREATE TABLE IF NOT EXISTS "verifications" (
      "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "identifier" TEXT NOT NULL,
      "value" TEXT NOT NULL,
      "expiresAt" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Criar índices
    `CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users"("email")`,
    `CREATE INDEX IF NOT EXISTS "sessions_userId_idx" ON "sessions"("userId")`,
    `CREATE INDEX IF NOT EXISTS "sessions_token_idx" ON "sessions"("token")`,
    `CREATE INDEX IF NOT EXISTS "verifications_identifier_idx" ON "verifications"("identifier")`,
  ]
  
  try {
    for (let i = 0; i < sqlCommands.length; i++) {
      console.log(`   ${i + 1}/${sqlCommands.length}: Executando comando...`)
      
      const { error } = await supabase.rpc('exec_sql', { 
        sql_query: sqlCommands[i] 
      })
      
      if (error) {
        console.log(`   ⚠️  Comando ${i + 1} falhou: ${error.message}`)
        console.log('   📝 Execute manualmente no SQL Editor do Supabase:')
        console.log(`   ${sqlCommands[i]}`)
      } else {
        console.log(`   ✅ Comando ${i + 1} executado com sucesso`)
      }
    }
    
    console.log('\n✅ Setup concluído!')
    
  } catch (error) {
    console.error('❌ Erro durante o setup:', error)
    console.log('\n📋 Execute manualmente no Supabase SQL Editor:')
    console.log('   scripts/supabase-better-auth-setup.sql')
  }
}

// Executar setup
setupBetterAuthTablesDirect()
