import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

/**
 * Middleware de autenticação para proteção de rotas
 * 
 * Funcionalidades:
 * - Verifica se o usuário está autenticado
 * - Redireciona usuários não autenticados para /auth/login
 * - Redireciona usuários autenticados em /auth/* para /dashboard
 * - Renova tokens automaticamente
 */
export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)
  
  // Renovar sessão se necessário
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Definir rotas públicas (não requerem autenticação)
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password']
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Se não há sessão e não é uma rota pública, redirecionar para login
  if (!session && !isPublicRoute) {
    const redirectUrl = new URL('/auth/login', request.url)
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Se há sessão e está em rota de auth, redirecionar para dashboard
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Se há sessão, o usuário está autenticado e pode acessar as rotas protegidas
  // A verificação de perfil completo será feita nos componentes quando necessário

  return response
}

/**
 * Configuração do middleware
 * Define quais rotas devem ser protegidas pelo middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
