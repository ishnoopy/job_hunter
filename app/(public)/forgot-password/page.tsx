'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/auth-schemas'
import type { AuthError } from '@/lib/auth-types'

/**
 * Forgot password page component for password reset
 */
export default function ForgotPasswordPage() {
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  /**
   * Handles the form submission for password reset
   * @param formData - Validated form data
   */
  const onSubmit = async (formData: ForgotPasswordFormData): Promise<void> => {
    setError('')
    setSuccessMessage('')
    try {
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (resetError) {
        throw resetError
      }
      setSuccessMessage('Password reset instructions have been sent to your email')
      reset()
    } catch (err) {
      const authError = err as AuthError
      setError(authError.message || 'An error occurred while sending reset instructions')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you instructions to reset your password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="error">
                <p className="text-sm">{error}</p>
              </Alert>
            )}
            {successMessage && (
              <Alert variant="success">
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send reset instructions'}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
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
