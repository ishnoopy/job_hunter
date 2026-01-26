'use client'

import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'

/**
 * Navigation component with auth-aware links
 */
export function Navigation() {
  const { isAuthenticated, isLoading, signOut } = useAuth()

  /**
   * Handles user sign out
   */
  const handleSignOut = async (): Promise<void> => {
    await signOut()
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Application Tracker
            </Link>
            {isAuthenticated && (
              <div className="flex gap-4">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            ) : isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
