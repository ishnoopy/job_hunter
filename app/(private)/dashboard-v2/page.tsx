'use client'

import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useApplicationsCount, useApplicationsCountByStatus } from '@/lib/hooks/use-applications'
import Link from 'next/link'

/**
 * Protected dashboard page component
 */
export default function DashboardPage() {
  const { user } = useAuth()
  const { data: applicationsCount } = useApplicationsCount();
  const { data: appliedApplicationsCount } = useApplicationsCountByStatus("applied");

  return (
    <div className="min-h-screen bg-bg-secondary px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-text-primary">Dashboard</h1>
          <p className="mt-2 text-base text-text-secondary">
            Welcome back, {user?.email}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-text-primary">Profile</CardTitle>
              <CardDescription className="text-text-secondary">Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-text-tertiary">Email</p>
                  <p className="text-sm text-text-primary mt-1">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-tertiary">User ID</p>
                  <p className="text-sm text-text-primary font-mono mt-1">{user?.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-tertiary">Created At</p>
                  <p className="text-sm text-text-primary mt-1">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-text-primary">Applications</CardTitle>
              <CardDescription className="text-text-secondary">Track your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-5xl font-semibold text-text-primary">{applicationsCount}</p>
                <p className="text-sm text-text-tertiary mt-2">Total applications</p>
                <p className="text-sm text-text-tertiary mt-2">Applied: {appliedApplicationsCount}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-text-primary">Quick Actions</CardTitle>
              <CardDescription className="text-text-secondary">Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/applications">
                <Button className="w-full" variant="default">
                  View Applications
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-text-primary">Recent Activity</CardTitle>
            <CardDescription className="text-text-secondary">Your latest application updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16 text-text-tertiary">
              <p className="text-base">No recent activity</p>
              <p className="text-sm mt-2">Start by adding your first application</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
