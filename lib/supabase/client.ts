import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente Supabase para uso no lado do cliente (browser)
 * Usado em componentes que executam no cliente
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
