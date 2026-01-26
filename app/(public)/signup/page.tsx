'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpSchema, type SignUpFormData } from '@/lib/auth-schemas'
import type { AuthError } from '@/lib/auth-types'
import { createClient } from '@/lib/supabase-client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

/**
 * Sign up page component for user registration
 */
export default function SignUpPage() {
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  /**
   * Handles the form submission for user sign up
   * @param formData - Validated form data
   */
  const onSubmit = async (formData: SignUpFormData): Promise<void> => {
    setError('')
    setSuccessMessage('')
    try {
      const supabase = createClient()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (signUpError) {
        throw signUpError
      }
      if (data.user) {
        if (data.user.identities && data.user.identities.length === 0) {
          setError('An account with this email already exists')
          return
        }
        setSuccessMessage('Sign up successful! Please check your email to confirm your account.')
        reset()
      }
    } catch (err) {
      const authError = err as AuthError
      setError(authError.message || 'An error occurred during sign up')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-secondary px-4 py-12">
      <Card className="w-full max-w-md border-border shadow-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-semibold text-text-primary">Create an account</CardTitle>
          <CardDescription className="text-text-secondary">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <p className="text-sm">{error}</p>
              </Alert>
            )}
            {successMessage && (
              <Alert variant="default">
                <p className="text-sm">{successMessage}</p>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register('confirmPassword')}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Sign up'}
            </Button>
            <p className="text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
