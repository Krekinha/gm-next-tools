import { execSync } from 'child_process'
import { prisma } from '../lib/prisma'

async function migrateToSupabase() {
  try {
    console.log('🔄 Iniciando migração para Supabase...')
    
    // 1. Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL não configurada. Execute primeiro: pnpm setup-supabase')
      process.exit(1)
    }
    
    // 2. Gerar Prisma Client
    console.log('🔄 Gerando Prisma Client...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    console.log('✅ Prisma Client gerado')
    
    // 3. Criar migração
    console.log('🔄 Criando migração para Supabase...')
    execSync('npx prisma migrate dev --name supabase-migration', { stdio: 'inherit' })
    console.log('✅ Migração criada')
    
    // 4. Testar conexão
    console.log('🔄 Testando conexão com Supabase...')
    await prisma.$connect()
    console.log('✅ Conexão com Supabase estabelecida')
    
    // 5. Criar dados de teste
    console.log('🔄 Criando dados de teste...')
    
    const user = await prisma.user.create({
      data: {
        email: 'test@supabase.com',
        name: 'Usuário Supabase',
      },
    })
    console.log('✅ Usuário criado:', user)
    
    const post = await prisma.post.create({
      data: {
        title: 'Primeiro Post no Supabase',
        content: 'Este é um post de teste criado no Supabase.',
        published: true,
        authorId: user.id,
      },
    })
    console.log('✅ Post criado:', post)
    
    // 6. Testar consultas
    console.log('🔄 Testando consultas...')
    const usersWithPosts = await prisma.user.findMany({
      include: { posts: true },
    })
    console.log('✅ Consulta executada:', usersWithPosts.length, 'usuários encontrados')
    
    console.log('')
    console.log('🎉 Migração para Supabase concluída com sucesso!')
    console.log('')
    console.log('📊 Dados criados:')
    console.log(`- ${usersWithPosts.length} usuários`)
    console.log(`- ${usersWithPosts.reduce((acc, user) => acc + user.posts.length, 0)} posts`)
    
  } catch (error) {
    console.error('❌ Erro durante a migração:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Conexão fechada')
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  migrateToSupabase()
}

export { migrateToSupabase }
