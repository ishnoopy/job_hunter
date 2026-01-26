# UI Components

ShadCN-style React components built with Tailwind CSS and class-variance-authority, based on the Wise design system.

## Design System Architecture

All design tokens are defined as CSS custom properties in `app/globals.css` for easy maintenance and consistency across the application. Components reference these CSS variables instead of hardcoded values.

### Colors

Defined in `globals.css`:

- **Primary**: `--primary` (#9FE870 - Lime green)
  - Hover: `--primary-hover` (#8DD65D)
  - Active: `--primary-active` (#7BC44A)
- **Neutral Scale**: `--neutral-{50-900}` (Gray palette)
- **Status Colors**: `--status-{warning|error|success|info}`
- **Text Colors**: `--text-{primary|secondary|tertiary|inverse}`
- **Border Colors**: `--border`, `--border-hover`, `--border-focus`

### Typography

Font sizes and weights are managed through Tailwind's utility classes, consistent with the design system.

### Spacing

Uses an 8px-based scale defined in `globals.css`:

```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
```

### Border Radius

Defined in `globals.css`:

- **Buttons**: `--radius-full` (9999px)
- **Cards**: `--radius-xl` (24px)
- **Inputs**: `--radius-lg` (16px)
- **Badges/Tabs**: `--radius-full`

### Shadows

Subtle elevation system:

```css
--shadow-sm
--shadow
--shadow-md
--shadow-lg
```

### Component Dimensions

Standard heights for consistent UI:

```css
--input-height: 3rem;           /* 48px */
--button-height: 2.75rem;       /* 44px */
--button-height-sm: 2.25rem;    /* 36px */
--button-height-lg: 3rem;       /* 48px */
```

## Components

### Button

Fully rounded buttons with primary lime green color.

```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="default">
  Send money
</Button>

<Button variant="secondary" size="lg">
  Compare price
</Button>

<Button variant="outline" size="sm">
  Cancel
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `link`
**Sizes**: `sm`, `default`, `lg`, `icon`
**Props**: `fullWidth` (boolean)

### Card

Clean cards with light gray backgrounds.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card variant="default" padding="default">
  <CardHeader>
    <CardTitle>British Pound</CardTitle>
  </CardHeader>
  <CardContent>
    0.00
  </CardContent>
</Card>
```

**Variants**: `default` (gray bg), `elevated` (white with shadow), `outline`
**Padding**: `none`, `sm`, `default`, `lg`
**Props**: `interactive` (boolean) - adds hover shadow

### Input

Rounded inputs with focus ring using CSS variables.

```tsx
import { Input } from '@/components/ui/input';

<Input
  type="email"
  placeholder="First, enter your email address"
  inputSize="default"
/>
```

**Variants**: `default`, `error`
**Sizes**: `sm`, `default`, `lg`

### Tabs

Pill-style tabs with rounded design.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

<Tabs value="international" onValueChange={setValue}>
  <TabsList>
    <TabsTrigger value="international">International</TabsTrigger>
    <TabsTrigger value="same-currency">Same currency</TabsTrigger>
  </TabsList>
  <TabsContent value="international">
    {/* Content */}
  </TabsContent>
</Tabs>
```

### Label

Text labels for form fields.

```tsx
import { Label } from '@/components/ui/label';

<Label htmlFor="email">Email address</Label>
```

### Select

Styled dropdown select.

```tsx
import { Select } from '@/components/ui/select';

<Select>
  <option value="usd">USD</option>
  <option value="eur">EUR</option>
</Select>
```

### Textarea

Multi-line text input.

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea placeholder="Enter your message" />
```

### Badge

Small status indicators.

```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
```

**Variants**: `default`, `secondary`, `outline`, `success`, `warning`, `error`

### Avatar

Circular user avatars.

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Dialog

Modal dialogs.

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog isOpen={isOpen} onClose={onClose}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create your account</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Alert

Notification messages.

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your transfer was completed.</AlertDescription>
</Alert>
```

**Variants**: `default`, `info`, `success`, `warning`, `error`

### Separator

Horizontal or vertical dividers.

```tsx
import { Separator } from '@/components/ui/separator';

<Separator orientation="horizontal" />
```

### Skeleton

Loading placeholders.

```tsx
import { Skeleton } from '@/components/ui/skeleton';

<Skeleton className="h-12 w-full" />
```

## Design Tokens

All design tokens are defined in `app/globals.css` as CSS custom properties:

```tsx
import { tokens } from '@/lib/tokens';

// Access tokens (returns CSS variable references)
const primaryColor = tokens.colors.primary.DEFAULT; // 'var(--primary)'
const spacing = tokens.spacing[4]; // 'var(--spacing-4)'
const borderRadius = tokens.borderRadius.lg; // 'var(--radius-lg)'
```

## Customizing the Design System

To customize colors, spacing, or other tokens:

1. **Edit `app/globals.css`** - Update the CSS custom properties in the `:root` selector
2. **Components automatically update** - All components reference these CSS variables
3. **Tailwind integration** - Variables are registered in the `@theme inline` block for Tailwind utilities

Example - changing the primary color:

```css
:root {
  --primary: #YOUR_COLOR;
  --primary-hover: #YOUR_HOVER_COLOR;
  --primary-active: #YOUR_ACTIVE_COLOR;
}
```

## Best Practices

1. **Use CSS variables** - All styling references `globals.css` variables
2. **No hardcoded values** - Use design tokens for consistency
3. **Leverage variants** - Use class-variance-authority for component variants
4. **Maintain spacing scale** - Use the 8px-based spacing scale
5. **Follow accessibility guidelines** - Proper ARIA attributes and semantic HTML
6. **Type safety** - All components use TypeScript with proper types
7. **Keep components composable** - Small, reusable, single-purpose components

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Utility-first styling with CSS-first configuration
- **class-variance-authority**: Variant management
- **Next.js App Router**: Framework
- **CSS Custom Properties**: Design token system

## Benefits of CSS Variables Approach

1. **Single source of truth** - All tokens in one place (`globals.css`)
2. **Easy theming** - Change values without touching components
3. **Runtime flexibility** - Can be modified with JavaScript if needed
4. **Better maintainability** - Update design system in one location
5. **CSS-first** - Works with Tailwind v4's modern approach
6. **No build-time coupling** - Components don't hardcode values

## Contributing

When adding new components:

1. Reference CSS variables from `globals.css`
2. Use inline styles for CSS variable values (e.g., `style={{ borderRadius: 'var(--radius-lg)' }}`)
3. Use Tailwind classes for colors defined in `@theme inline`
4. Follow the existing pattern with class-variance-authority
5. Add proper TypeScript types and JSDoc comments
6. Update this README with usage examples
