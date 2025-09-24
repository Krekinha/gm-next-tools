'use client'

import { AppToggleTheme } from '@/components/layout/app-toggle-theme'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function AppTopbar() {
  return (
    <header
      className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 bg-background"
      suppressHydrationWarning
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>
      {/* Controles do TopBar - Canto direito */}
      <div className="flex items-center">
        <AppToggleTheme />
      </div>
    </header>
  )
}
