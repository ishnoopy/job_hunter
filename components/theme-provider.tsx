'use client'

import { ThemeProvider as NextThemesProvider, type Attribute } from 'next-themes'
import { type ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
  attribute?: Attribute | Attribute[]
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

/**
 * Theme provider component that wraps next-themes ThemeProvider
 * @param children - Child components
 * @param attribute - HTML attribute to apply theme class (default: 'class')
 * @param defaultTheme - Default theme name (default: 'system')
 * @param enableSystem - Enable system theme detection (default: true)
 * @param disableTransitionOnChange - Disable transitions on theme change (default: false)
 */
export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'light',
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  )
}
