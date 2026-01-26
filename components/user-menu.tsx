'use client'

import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun, User, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRef } from 'react'

/**
 * Theme toggle button component
 */
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const hasMounted = useRef<boolean>(false)

  // Track mount state without triggering re-renders
  if (typeof window !== 'undefined') {
    hasMounted.current = true
  }

  const currentTheme = resolvedTheme ?? theme

  if (!hasMounted.current) {
    return (
      <Button variant="ghost" size="icon-sm" className="size-8">
        <div className="size-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="size-8"
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {currentTheme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  )
}

/**
 * Gets user initials from email
 */
function getUserInitials(email: string | undefined): string {
  if (!email) return 'U'
  const parts = email.split('@')[0].split(/[._-]/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return email[0].toUpperCase()
}

/**
 * User menu component displaying auth state and actions
 */
export function UserMenu() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="size-8 animate-pulse rounded-full bg-muted" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <ThemeToggle />
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
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="size-8 rounded-full">
            <span className="text-xs font-medium">
              {getUserInitials(user?.email)}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <User className="size-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={signOut}
            className="gap-2"
          >
            <LogOut className="size-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
