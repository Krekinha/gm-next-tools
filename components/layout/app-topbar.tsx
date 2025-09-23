'use client'

import { MainToggleTheme } from '@/components/layout/main-toggle-theme'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '../ui/separator'

export function AppTopbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <h1 className="font-semibold text-lg">GM Tools Dashboard</h1>
      </div>
      {/* Controles do TopBar - Canto direito */}
      <div className="flex items-center">
        <MainToggleTheme />
      </div>
    </header>
  )
}
