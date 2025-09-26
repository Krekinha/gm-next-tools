import { createClient } from '@/lib/supabase/client'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { User } from '@/lib/schemas/auth'

/**
 * Utilitários para autenticação no lado do cliente
 */
export const authClient = {
  /**
   * Fazer login com email e senha
   */
  async signIn(email: string, password: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  },

  /**
   * Registrar novo usuário
   */
  async signUp(email: string, password: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  },

  /**
   * Fazer logout
   */
  async signOut() {
    const supabase = createClient()
    
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: error.message }
    }

    return { error: null }
  },

  /**
   * Obter usuário atual
   */
  async getCurrentUser() {
    const supabase = createClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return { user: null, error: error.message }
    }

    return { user, error: null }
  },

  /**
   * Obter sessão atual
   */
  async getCurrentSession() {
    const supabase = createClient()
    
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      return { session: null, error: error.message }
    }

    return { session, error: null }
  },

  /**
   * Redefinir senha
   */
  async resetPassword(email: string) {
    const supabase = createClient()
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  },

  /**
   * Atualizar senha
   */
  async updatePassword(password: string) {
    const supabase = createClient()
    
    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  },
}

/**
 * Utilitários para autenticação no lado do servidor
 */
export const authServer = {
  /**
   * Obter usuário atual no servidor
   * IMPORTANTE: Use sempre este método em Server Components
   */
  async getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
    try {
      const supabase = await createServerSupabaseClient()
      
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        return { user: null, error: error.message }
      }

      if (!user) {
        return { user: null, error: 'Usuário não autenticado' }
      }

      // Buscar perfil do usuário
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        return { user: null, error: profileError.message }
      }

      const userWithProfile: User = {
        id: user.id,
        email: user.email!,
        full_name: profile?.full_name || null,
        avatar_url: profile?.avatar_url || null,
        role: profile?.role || 'user',
        created_at: user.created_at,
        updated_at: profile?.updated_at || user.updated_at,
      }

      return { user: userWithProfile, error: null }
    } catch (error) {
      return { 
        user: null, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      }
    }
  },

  /**
   * Verificar se usuário está autenticado
   */
  async isAuthenticated(): Promise<boolean> {
    const { user } = await this.getCurrentUser()
    return !!user
  },

  /**
   * Verificar se usuário é admin
   */
  async isAdmin(): Promise<boolean> {
    const { user } = await this.getCurrentUser()
    return user?.role === 'admin'
  },
}
