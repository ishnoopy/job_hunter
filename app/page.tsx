'use client'

import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react'
import NextImage from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

/**
 * Feature card component displaying a single feature
 */
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-border bg-card transition-all hover:shadow-lg hover:scale-105">
      <CardContent className="p-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-card-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

/**
 * Landing page component for the application tracker
 */
export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-script text-2xl text-primary">Job Hunt</span>
          </Link>
          <div className="flex items-center gap-2">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Track Your Job Search Journey
            </div>
            <h1 className="mb-6 font-script text-5xl font-normal tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Your Dream Job
              <br />
              <span className="text-primary">Starts Here</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Stay organized, track your applications, and land your dream job faster.
              A simple, powerful tool to manage your entire job search process.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="gap-2 px-8">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image/Illustration Placeholder */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-2xl">
            <div className="aspect-video w-full rounded-lg bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <NextImage
                src="/jobhunter-preview001.png"
                alt="Job Hunter Preview"
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Powerful features designed to help you stay on top of your job search
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Briefcase className="h-6 w-6" />}
              title="Track Applications"
              description="Keep all your job applications organized in one place. Never lose track of where you applied."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Timeline View"
              description="See your application timeline and follow up at the right time to stay top of mind."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Analytics Dashboard"
              description="Visualize your progress with insights on application status, response rates, and more."
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Status Management"
              description="Easily update and track the status of each application from applied to offer."
            />
            <FeatureCard
              icon={<Target className="h-6 w-6" />}
              title="Notes & Reminders"
              description="Add notes, contacts, and important details for each application."
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Progress Tracking"
              description="Monitor your job search metrics and optimize your application strategy."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card className="border-primary/20 bg-linear-to-r from-primary/10 to-accent/10">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Join others who are taking control of their job search.
                Sign up today and start tracking your applications.
              </p>
              <Link href="/signup">
                <Button size="lg" className="gap-2 px-8">
                  Create Your Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="font-script text-xl text-primary">Job Hunt</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Job Hunt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
