# Supabase Clients - Clientes de Banco de Dados

Clientes Supabase configurados para uso no cliente e servidor com SSR.

## 📋 Visão Geral

Os arquivos em `lib/supabase/` fornecem clientes Supabase configurados para diferentes contextos de execução, garantindo compatibilidade com SSR e gerenciamento adequado de cookies.

## 🎯 Funcionalidades

- **Cliente Browser**: Para componentes cliente
- **Cliente Servidor**: Para Server Components e API routes
- **Middleware**: Para proteção de rotas
- **SSR Compatível**: Gerenciamento correto de cookies
- **TypeScript**: Tipagem completa para segurança

## 📦 Importação

```tsx
// Cliente
import { createClient } from '@/lib/supabase/client'

// Servidor
import { createServerSupabaseClient } from '@/lib/supabase/server'

// Middleware
import { createMiddlewareSupabaseClient } from '@/lib/supabase/middleware'
```

## 🚀 Clientes Disponíveis

### createClient (Browser)

Cliente Supabase para uso no lado do cliente (browser).

```tsx
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Características:**
- Usado em componentes cliente (`'use client'`)
- Acesso direto ao localStorage
- Gerenciamento automático de sessão
- Ideal para interações do usuário

### createServerSupabaseClient (Servidor)

Cliente Supabase para uso no lado do servidor.

```tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignorado se chamado de Server Component
            // Middleware pode lidar com refresh de sessão
          }
        },
      },
    }
  )
}
```

**Características:**
- Usado em Server Components e API routes
- Gerenciamento de cookies via Next.js
- Acesso a dados do servidor
- Ideal para autenticação server-side

### createMiddlewareSupabaseClient (Middleware)

Cliente Supabase para uso no middleware.

```tsx
import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export function createMiddlewareSupabaseClient(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  return { supabase, response }
}
```

**Características:**
- Usado no middleware do Next.js
- Proteção automática de rotas
- Refresh de sessão automático
- Redirecionamentos baseados em auth

## 🚀 Exemplos de Uso

### Uso no Cliente
```tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [])

  if (loading) return <div>Carregando...</div>
  if (!user) return <div>Não autenticado</div>

  return <div>Olá, {user.email}!</div>
}
```

### Uso no Servidor
```tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Bem-vindo, {user.email}!</p>
    </div>
  )
}
```

### Uso no Middleware
```tsx
import { createMiddlewareSupabaseClient } from '@/lib/supabase/middleware'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareSupabaseClient(request)

  const { data: { user } } = await supabase.auth.getUser()

  // Proteger rotas que requerem autenticação
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Redirecionar usuários autenticados da página de login
  if (request.nextUrl.pathname.startsWith('/auth') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

### API Route com Supabase
```tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  // Buscar dados do usuário
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ profile: data })
}
```

### Server Action com Supabase
```tsx
'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Não autenticado')
  }

  const full_name = formData.get('full_name') as string

  const { error } = await supabase
    .from('profiles')
    .update({ full_name })
    .eq('id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/profile')
}
```

## 🔧 Configuração

### Variáveis de Ambiente
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Configuração do Middleware
```tsx
// middleware.ts
import { createMiddlewareSupabaseClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareSupabaseClient(request)
  
  // Lógica de proteção de rotas...
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## 📝 Notas de Implementação

### Dependências
- **@supabase/ssr**: Cliente Supabase com SSR
- **next/headers**: Gerenciamento de cookies
- **next/server**: Tipos do Next.js

### Gerenciamento de Cookies
- **Browser**: Automático via localStorage
- **Server**: Via Next.js cookies API
- **Middleware**: Controle manual de cookies

### Segurança
- **Anon Key**: Chave pública segura
- **URL**: Endpoint Supabase
- **Cookies**: Gerenciamento seguro de sessão

## 🔮 Melhorias Futuras

- [ ] **Row Level Security**: Configuração de RLS
- [ ] **Real-time**: Configuração de subscriptions
- [ ] **Storage**: Cliente para Supabase Storage
- [ ] **Edge Functions**: Integração com Edge Functions
- [ ] **Analytics**: Tracking de eventos

## 🧪 Testes

### Cenários de Teste
1. **Cliente**: Autenticação funciona no browser
2. **Servidor**: Dados carregados corretamente
3. **Middleware**: Proteção de rotas funciona
4. **Cookies**: Gerenciamento correto de sessão
5. **Erros**: Tratamento adequado de falhas

### Exemplo de Teste
```tsx
import { createClient } from '@/lib/supabase/client'

describe('Supabase Client', () => {
  it('should create client with correct configuration', () => {
    const client = createClient()
    expect(client).toBeDefined()
  })

  it('should handle authentication', async () => {
    const client = createClient()
    const { data, error } = await client.auth.getUser()
    
    // Teste baseado no estado de autenticação
    expect(error).toBeNull()
  })
})
```

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: @supabase/ssr, Next.js
