import type { ReactNode } from 'react'

interface PublicLayoutProps {
  children: ReactNode
}

/**
 * Layout for public routes (authentication pages)
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
  return <>{children}</>
}
