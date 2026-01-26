'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Auth provider component that wraps the application
 * @param children - Child components
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const supabase = createClient()
    const fetchUser = async (): Promise<void> => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        setUser(currentUser)
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  /**
   * Signs out the current user
   */
  const signOut = async (): Promise<void> => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook to access auth context
 * @returns Auth context value
 * @throws Error if used outside AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
