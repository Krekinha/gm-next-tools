'use client'

import { AppToggleTheme } from '@/components/layout/app-toggle-theme'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useSession, signOut } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

export function AppTopbar() {
  const { data: session, isPending } = useSession()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header
      className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 bg-background"
      suppressHydrationWarning
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>
      
      {/* Controles do TopBar - Canto direito */}
      <div className="flex items-center gap-2">
        {isPending ? (
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        ) : session ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{session.user.name || session.user.email}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="h-8 w-8 p-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
        <AppToggleTheme />
      </div>
    </header>
  )
}
