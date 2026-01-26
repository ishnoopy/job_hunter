import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { NextRequest } from 'next/server'

/**
 * Handles the OAuth callback from Supabase authentication
 * @param request - The incoming request object
 * @returns Redirect response
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  if (code) {
    const supabase = await createServerSupabaseClient()
    await supabase.auth.exchangeCodeForSession(code)
  }
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
}
