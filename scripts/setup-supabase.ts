import { execSync } from 'child_process'
import { writeFileSync, existsSync } from 'fs'

// Configurações do Supabase
const SUPABASE_CONFIG = {
  projectUrl: 'https://gm-tools.supabase.co',
  databaseUrl: 'postgresql://postgres:[YOUR-PASSWORD]@db.gm-tools.supabase.co:5432/postgres',
  anonKey: '[YOUR-ANON-KEY]',
  serviceRoleKey: '[YOUR-SERVICE-ROLE-KEY]'
}

// Template do arquivo .env
const ENV_TEMPLATE = `# Supabase Configuration
DATABASE_URL="${SUPABASE_CONFIG.databaseUrl}"
DIRECT_URL="${SUPABASE_CONFIG.databaseUrl}"

# Supabase Project Settings
NEXT_PUBLIC_SUPABASE_URL="${SUPABASE_CONFIG.projectUrl}"
NEXT_PUBLIC_SUPABASE_ANON_KEY="${SUPABASE_CONFIG.anonKey}"
SUPABASE_SERVICE_ROLE_KEY="${SUPABASE_CONFIG.serviceRoleKey}"

# Prisma
PRISMA_GENERATE_DATAPROXY="true"
`

function setupSupabase() {
  try {
    console.log('🔄 Configurando Supabase...')
    
    // Verificar se o arquivo .env já existe
    if (existsSync('.env')) {
      console.log('⚠️  Arquivo .env já existe. Criando backup...')
      writeFileSync('.env.backup', require('fs').readFileSync('.env', 'utf8'))
    }
    
    // Criar arquivo .env
    writeFileSync('.env', ENV_TEMPLATE)
    console.log('✅ Arquivo .env criado com template do Supabase')
    
    // Instalar dependências do Supabase se necessário
    console.log('🔄 Verificando dependências...')
    try {
      execSync('pnpm add @supabase/supabase-js', { stdio: 'inherit' })
      console.log('✅ @supabase/supabase-js instalado')
    } catch (error) {
      console.log('ℹ️  @supabase/supabase-js já instalado ou erro na instalação')
    }
    
    console.log('')
    console.log('📋 PRÓXIMOS PASSOS:')
    console.log('1. Edite o arquivo .env e substitua os valores:')
    console.log('   - [YOUR-PASSWORD]: Senha do banco de dados')
    console.log('   - [YOUR-ANON-KEY]: Chave anônima do Supabase')
    console.log('   - [YOUR-SERVICE-ROLE-KEY]: Chave de serviço do Supabase')
    console.log('')
    console.log('2. Execute as migrações:')
    console.log('   pnpm db:migrate')
    console.log('')
    console.log('3. Teste a conexão:')
    console.log('   pnpm db:test')
    
  } catch (error) {
    console.error('❌ Erro ao configurar Supabase:', error)
    process.exit(1)
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  setupSupabase()
}

export { setupSupabase }
