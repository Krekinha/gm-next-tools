'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface User {
  id: number
  email: string
  name: string | null
  created_at: string
  updated_at: string
}

interface Post {
  id: number
  title: string
  content: string | null
  published: boolean
  created_at: string
  updated_at: string
  author_id: number
}

export function SupabaseExample() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<string>('')

  // Função para testar conexão com Supabase
  const testConnection = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('users').select('count').limit(1)

      if (error) {
        setConnectionStatus('⚠️ Conexão estabelecida, mas tabelas ainda não foram criadas')
      } else {
        setConnectionStatus('✅ Conexão com Supabase estabelecida com sucesso!')
      }
    } catch (error) {
      setConnectionStatus('❌ Erro na conexão com Supabase')
    } finally {
      setLoading(false)
    }
  }

  // Função para buscar usuários via Supabase
  const fetchUsersSupabase = async () => {
    setLoading(true)
    try {
      const { data, error } = await data

      if (error) {
        console.error('Erro ao buscar usuários:', error)
        return
      }

      setUsers(data || [])
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    } finally {
      setLoading(false)
    }
  }

  // Função para buscar posts via Supabase
  const fetchPostsSupabase = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar posts:', error)
        return
      }

      setPosts(data || [])
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Exemplo de Integração com Supabase</h2>
        <p className="text-muted-foreground">
          Este componente demonstra como integrar o Supabase com React usando o cliente JavaScript.
        </p>
      </div>

      {/* Status da conexão */}
      <div className="p-4 border rounded-lg bg-muted/50">
        <h3 className="font-semibold mb-2">Status da Conexão</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {connectionStatus || 'Clique em "Testar Conexão" para verificar o status'}
        </p>
        <button
          type="button"
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testando...' : 'Testar Conexão'}
        </button>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={fetchUsersSupabase}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Carregando...' : 'Buscar Usuários (Supabase)'}
        </button>

        <button
          type="button"
          onClick={fetchPostsSupabase}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? 'Carregando...' : 'Buscar Posts (Supabase)'}
        </button>
      </div>

      {/* Lista de usuários */}
      {users.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Usuários ({users.length})</h3>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="p-4 border rounded">
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Nome:</strong> {user.name || 'Não informado'}
                </p>
                <p>
                  <strong>Criado em:</strong> {new Date(user.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de posts */}
      {posts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Posts ({posts.length})</h3>
          <div className="space-y-2">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded">
                <p>
                  <strong>ID:</strong> {post.id}
                </p>
                <p>
                  <strong>Título:</strong> {post.title}
                </p>
                <p>
                  <strong>Conteúdo:</strong> {post.content || 'Sem conteúdo'}
                </p>
                <p>
                  <strong>Publicado:</strong> {post.published ? 'Sim' : 'Não'}
                </p>
                <p>
                  <strong>Autor ID:</strong> {post.author_id}
                </p>
                <p>
                  <strong>Criado em:</strong> {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
        <h3 className="font-semibold mb-2">📋 Instruções</h3>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Configure as variáveis de ambiente no arquivo .env</li>
          <li>
            Execute{' '}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pnpm migrate-supabase</code>
          </li>
          <li>Teste a conexão usando os botões acima</li>
        </ol>
      </div>
    </div>
  )
}
