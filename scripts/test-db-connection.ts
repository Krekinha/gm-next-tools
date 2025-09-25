import { prisma } from '../lib/prisma'

async function testDatabaseConnection() {
  try {
    console.log('🔄 Testando conexão com o banco de dados...')
    
    // Teste básico de conexão
    await prisma.$connect()
    console.log('✅ Conexão com o banco estabelecida com sucesso!')
    
    // Teste de criação de dados
    console.log('🔄 Criando dados de teste...')
    
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Usuário Teste',
      },
    })
    console.log('✅ Usuário criado:', user)
    
    const post = await prisma.post.create({
      data: {
        title: 'Primeiro Post',
        content: 'Este é um post de teste para verificar a funcionalidade do banco.',
        published: true,
        authorId: user.id,
      },
    })
    console.log('✅ Post criado:', post)
    
    // Teste de consulta com relacionamento
    console.log('🔄 Testando consulta com relacionamento...')
    const userWithPosts = await prisma.user.findUnique({
      where: { id: user.id },
      include: { posts: true },
    })
    console.log('✅ Usuário com posts:', userWithPosts)
    
    // Teste de contagem
    const userCount = await prisma.user.count()
    const postCount = await prisma.post.count()
    console.log(`📊 Estatísticas: ${userCount} usuários, ${postCount} posts`)
    
    console.log('🎉 Todos os testes passaram com sucesso!')
    
  } catch (error) {
    console.error('❌ Erro ao testar conexão:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Conexão com o banco fechada.')
  }
}

// Executar o teste se este arquivo for executado diretamente
if (require.main === module) {
  testDatabaseConnection()
}

export { testDatabaseConnection }

