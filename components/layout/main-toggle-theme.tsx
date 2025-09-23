'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function MainToggleTheme() {
  const { setTheme } = useTheme()

  return (
    <div className="inline-flex items-center rounded-full border p-0.5 border-gray-700">
      <button
        type="button"
        className=""
        onClick={() => setTheme('light')}
        aria-label="Ativar tema claro"
      >
        <Sun className="dark:hover:text-gray-500 dark:text-gray-700 text-amber-400  size-7 rounded-full p-1.5" />
      </button>

      <button type="button" onClick={() => setTheme('dark')} aria-label="Ativar tema escuro">
        <Moon className="lucide lucide-moon text-gray-700 hover:text-gray-500 dark:text-amber-400 size-7 rounded-full p-1.5" />
      </button>
    </div>
  )
}
