'use client'

import { useAuth } from '@/components/auth-provider'
import { UserMenu } from '@/components/user-menu'
import { QueryProvider } from '@/lib/providers/query-provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

interface PrivateLayoutProps {
  children: ReactNode
}

/**
 * Layout for private routes that require authentication
 * Redirects to login if user is not authenticated
 */
export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-secondary">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    )
  }
  if (!isAuthenticated) {
    return null
  }
  return (
    <QueryProvider>
      <div className="min-h-screen bg-bg-secondary">
        <nav className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <Link href="/dashboard" className="flex items-center gap-2 transition-colors hover:text-primary">
              <span className="text-2xl">🌱</span>
              <span className="font-script text-2xl text-primary">Job Hunt</span>
            </Link>
            <UserMenu />
          </div>
        </nav>
        <main>{children}</main>
      </div>
    </QueryProvider>
  )
}
