import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Autenticação - GM Tools',
  description: 'Faça login ou registre-se no GM Tools',
}

/**
 * Layout específico para páginas de autenticação
 *
 * Características:
 * - SEM sidebar e topbar (interface limpa)
 * - Foco total no processo de autenticação
 * - Design responsivo e acessível
 * - Mantém o tema claro/escuro
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            {/* Container principal com centralização */}
            <div className="flex min-h-screen items-center justify-center p-4">
              {/* Card de autenticação */}
              <div className="w-full max-w-md space-y-6">
                {/* Logo/Título */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight">GM Tools</h1>
                  <p className="text-muted-foreground mt-2">
                    Suite de ferramentas para automatizar tarefas
                  </p>
                </div>

                {/* Conteúdo das páginas de auth */}
                <div className="space-y-4">{children}</div>

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>© 2024 GM Tools. Todos os direitos reservados.</p>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
