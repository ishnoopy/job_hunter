'use client'

import { useAuth } from '@/components/auth-provider'
import { UserMenu } from '@/components/user-menu'
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
    <div className="min-h-screen bg-bg-secondary">
      <nav className="border-b border-border bg-bg-primary shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/dashboard" className="text-xl font-semibold text-text-primary hover:text-primary transition-colors">
            Application Tracker
          </Link>
          <UserMenu />
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
