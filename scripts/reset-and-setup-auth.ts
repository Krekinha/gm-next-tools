import { execSync } from 'child_process'

async function resetAndSetupAuth() {
  console.log('🔄 Resetando e configurando Better Auth...')
  
  try {
    console.log('1. Resetando banco de dados...')
    execSync('pnpm dlx prisma migrate reset --force', { stdio: 'inherit' })
    
    console.log('2. Gerando cliente Prisma...')
    execSync('pnpm db:generate', { stdio: 'inherit' })
    
    console.log('3. Aplicando migrações...')
    execSync('pnpm db:migrate', { stdio: 'inherit' })
    
    console.log('✅ Setup concluído com sucesso!')
    console.log('\n📋 Próximos passos:')
    console.log('1. Configure as variáveis de ambiente no .env.local')
    console.log('2. Execute: pnpm dev')
    console.log('3. Teste o fluxo de login/registro')
    
  } catch (error) {
    console.error('❌ Erro durante o setup:', error)
    console.log('\n🔧 Soluções alternativas:')
    console.log('1. Verifique se o banco de dados está acessível')
    console.log('2. Confirme as variáveis DATABASE_URL e DIRECT_URL')
    console.log('3. Execute manualmente: pnpm dlx prisma migrate reset --force')
  }
}

resetAndSetupAuth()
