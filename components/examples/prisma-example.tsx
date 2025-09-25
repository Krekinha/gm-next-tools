'use client'

import { useState } from 'react'

interface User {
  id: number
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

interface Post {
  id: number
  title: string
  content: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  authorId: number
}

export function PrismaExample() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  // Função para buscar todos os usuários
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (_error) {
    } finally {
      setLoading(false)
    }
  }

  // Função para buscar todos os posts
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    } catch (_error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Exemplo de Uso do Prisma</h2>
        <p className="text-muted-foreground">
          Este componente demonstra como integrar o Prisma Client com React.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={fetchUsers}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Carregando...' : 'Buscar Usuários'}
        </button>

        <button
          type="button"
          onClick={fetchPosts}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Carregando...' : 'Buscar Posts'}
        </button>
      </div>

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
                  <strong>Criado em:</strong> {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

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
                  <strong>Autor ID:</strong> {post.authorId}
                </p>
                <p>
                  <strong>Criado em:</strong> {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
