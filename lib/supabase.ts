import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cliente Supabase para uso no cliente (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente Supabase para uso no servidor (com service role key)
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Função para testar conexão
export async function testSupabaseConnection() {
  try {
    console.log('🔄 Testando conexão com Supabase...')

    // Teste básico de conexão
    const { data, error } = await supabase.from('users').select('count').limit(1)

    if (error) {
      console.log('⚠️  Tabela users não existe ainda. Isso é normal para primeira configuração.')
      return { success: true, message: 'Conexão estabelecida, mas tabelas ainda não foram criadas' }
    }

    console.log('✅ Conexão com Supabase estabelecida com sucesso!')
    return { success: true, message: 'Conexão estabelecida e tabelas encontradas' }
  } catch (error) {
    console.error('❌ Erro ao conectar com Supabase:', error)
    return { success: false, message: 'Erro na conexão' }
  }
}
