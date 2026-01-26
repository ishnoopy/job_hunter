'use client'

import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

/**
 * User menu component displaying auth state and actions
 */
export function UserMenu() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm">
            Sign up
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-text-secondary">
        {user?.email}
      </span>
      <Button variant="outline" size="sm" onClick={signOut}>
        Sign out
      </Button>
    </div>
  )
}
