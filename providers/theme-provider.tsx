'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps as NextThemesProviderProps } from 'next-themes'
import type { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
  attribute?: NextThemesProviderProps['attribute']
  defaultTheme?: NextThemesProviderProps['defaultTheme']
  enableSystem?: NextThemesProviderProps['enableSystem']
  disableTransitionOnChange?: NextThemesProviderProps['disableTransitionOnChange']
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
