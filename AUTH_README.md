# Authentication Setup

This application uses **Supabase Authentication** for user management. Below is the complete guide for authentication features.

## 📁 File Structure

```
app/
├── login/
│   └── page.tsx                 # Login page
├── signup/
│   └── page.tsx                 # Sign-up page
├── forgot-password/
│   └── page.tsx                 # Password reset request page
├── reset-password/
│   └── page.tsx                 # Password reset page
└── auth/
    └── callback/
        └── route.ts             # OAuth callback handler

components/
└── auth-provider.tsx            # Auth context provider

hooks/
└── use-auth.ts                  # Auth state hook

lib/
├── supabase-client.ts           # Client-side Supabase client
├── supabase-server.ts           # Server-side Supabase client
└── auth-types.ts                # TypeScript types for auth

middleware.ts                    # Auth middleware for cookie management
```

## 🚀 Features

### Authentication Pages

1. **Sign Up** (`/signup`)
   - Email and password registration
   - Password confirmation
   - Email verification flow
   - Input validation
   - Error handling

2. **Login** (`/login`)
   - Email and password authentication
   - "Forgot password?" link
   - Redirect to home after login
   - Remember user session

3. **Forgot Password** (`/forgot-password`)
   - Request password reset email
   - Email validation
   - Success confirmation

4. **Reset Password** (`/reset-password`)
   - Set new password after email verification
   - Password confirmation
   - Auto-redirect to login

## 🔧 Usage

### Client Components

Use the `useAuth` hook in client components:

```typescript
'use client'

import { useAuth } from '@/hooks/use-auth'

export default function MyComponent() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>Please log in</div>
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Server Components

Use server-side utilities in server components:

```typescript
import { getCurrentUser } from '@/lib/supabase-server'

export default async function MyServerComponent() {
  const user = await getCurrentUser()

  if (!user) {
    return <div>Not authenticated</div>
  }

  return <div>Welcome, {user.email}</div>
}
```

### Auth Provider (Optional)

Wrap your app with `AuthProvider` for global auth state:

```typescript
// app/layout.tsx
import { AuthProvider } from '@/components/auth-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

Then use the context hook:

```typescript
import { useAuth } from '@/components/auth-provider'
```

## 🔐 Supabase Configuration

### Email Templates

In your Supabase dashboard, configure email templates:

1. Go to **Authentication** > **Email Templates**
2. Customize templates for:
   - Confirm signup
   - Reset password
   - Magic link

### Authentication Settings

1. Go to **Authentication** > **Settings**
2. Configure:
   - Site URL: `http://localhost:3000` (dev) or your production URL
   - Redirect URLs: Add your callback URLs
   - Email confirmation: Enable if needed
   - Password requirements: Set minimum length, etc.

### Email Confirmation

By default, Supabase requires email confirmation. To disable during development:

1. Go to **Authentication** > **Settings**
2. Disable "Enable email confirmations"

## 🎨 Styling

All authentication pages use:
- **shadcn/ui** components (Card, Button, Input, Label, Alert)
- **Tailwind CSS** for styling
- Responsive design (mobile-friendly)
- Clean, modern UI with consistent spacing

## 🔒 Security Features

- Password strength validation (minimum 6 characters)
- Email format validation
- CSRF protection via middleware
- Secure cookie handling
- Error messages sanitized (no sensitive data exposure)
- Session management with automatic refresh

## 📝 TypeScript Types

All authentication functions are fully typed:

```typescript
// lib/auth-types.ts
export interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface AuthError {
  message: string
  code?: string
}
```

## 🧪 Testing

To test authentication:

1. Start the dev server: `pnpm dev`
2. Navigate to `/signup` to create an account
3. Check your email for confirmation (if enabled)
4. Log in at `/login`
5. Test password reset at `/forgot-password`

## 🚧 Common Issues

### Email Not Sending

- Check Supabase dashboard for email delivery status
- Verify SMTP settings in Supabase
- Check spam folder

### Session Not Persisting

- Clear browser cookies
- Check middleware configuration
- Verify environment variables

### Redirect Issues

- Ensure callback URL matches in Supabase settings
- Check Site URL configuration
- Verify middleware matcher patterns

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js 15 App Router](https://nextjs.org/docs)
- [Supabase SSR Package](https://supabase.com/docs/guides/auth/server-side-rendering)
