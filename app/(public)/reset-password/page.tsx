'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/auth-schemas'
import type { AuthError } from '@/lib/auth-types'

/**
 * Reset password page component for setting a new password
 */
export default function ResetPasswordPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  /**
   * Handles the form submission for password reset
   * @param formData - Validated form data
   */
  const onSubmit = async (formData: ResetPasswordFormData): Promise<void> => {
    setError('')
    setSuccessMessage('')
    try {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.password,
      })
      if (updateError) {
        throw updateError
      }
      setSuccessMessage('Password updated successfully! Redirecting to login...')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      const authError = err as AuthError
      setError(authError.message || 'An error occurred while updating your password')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Set new password</CardTitle>
          <CardDescription>
            Enter your new password below
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
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new password"
                {...register('password')}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                {...register('confirmPassword')}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating password...' : 'Update password'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
