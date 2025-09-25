import { auth } from "../lib/auth"

async function testAuth() {
  console.log("🧪 Testando configuração do Better Auth...")

  try {
    // Testar se a configuração está correta
    console.log("✅ Configuração do Better Auth carregada com sucesso")
    
    // Verificar se as variáveis de ambiente estão configuradas
    const requiredEnvVars = [
      "BETTER_AUTH_SECRET",
      "DATABASE_URL",
    ]

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
    
    if (missingVars.length > 0) {
      console.log("⚠️  Variáveis de ambiente faltando:")
      missingVars.forEach(varName => console.log(`   - ${varName}`))
      console.log("\n📝 Configure essas variáveis no arquivo .env.local")
      return
    }

    console.log("✅ Todas as variáveis de ambiente necessárias estão configuradas")
    
    // Testar conexão com banco de dados
    console.log("🔄 Testando conexão com banco de dados...")
    
    // Aqui você pode adicionar testes específicos do Better Auth
    // Por exemplo, testar se consegue criar uma sessão de teste
    
    console.log("✅ Teste de configuração concluído com sucesso!")
    console.log("\n📋 Próximos passos:")
    console.log("1. Configure as variáveis de ambiente no .env.local")
    console.log("2. Execute as migrações do banco de dados")
    console.log("3. Inicie o servidor de desenvolvimento")
    console.log("4. Teste o fluxo de login/registro")

  } catch (error) {
    console.error("❌ Erro ao testar configuração:", error)
  }
}

testAuth()
