/**
 * Design tokens for the Wise-inspired design system
 * All values are defined in globals.css as CSS custom properties
 * This file serves as a TypeScript reference for the design tokens
 */

export const tokens = {
  colors: {
    primary: {
      DEFAULT: 'var(--primary)',
      hover: 'var(--primary-hover)',
      active: 'var(--primary-active)',
    },
    neutral: {
      50: 'var(--neutral-50)',
      100: 'var(--neutral-100)',
      200: 'var(--neutral-200)',
      300: 'var(--neutral-300)',
      400: 'var(--neutral-400)',
      500: 'var(--neutral-500)',
      600: 'var(--neutral-600)',
      700: 'var(--neutral-700)',
      800: 'var(--neutral-800)',
      900: 'var(--neutral-900)',
    },
    border: {
      DEFAULT: 'var(--border)',
      hover: 'var(--border-hover)',
      focus: 'var(--border-focus)',
    },
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      tertiary: 'var(--text-tertiary)',
      inverse: 'var(--text-inverse)',
    },
    background: {
      primary: 'var(--bg-primary)',
      secondary: 'var(--bg-secondary)',
      tertiary: 'var(--bg-tertiary)',
    },
    status: {
      warning: 'var(--status-warning)',
      error: 'var(--status-error)',
      success: 'var(--status-success)',
      info: 'var(--status-info)',
    },
  },
  spacing: {
    0: '0',
    1: 'var(--spacing-1)',
    2: 'var(--spacing-2)',
    3: 'var(--spacing-3)',
    4: 'var(--spacing-4)',
    5: 'var(--spacing-5)',
    6: 'var(--spacing-6)',
    8: 'var(--spacing-8)',
    10: 'var(--spacing-10)',
    12: 'var(--spacing-12)',
    16: 'var(--spacing-16)',
  },
  borderRadius: {
    none: '0',
    sm: 'var(--radius-sm)',
    DEFAULT: 'var(--radius)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    full: 'var(--radius-full)',
  },
  shadows: {
    sm: 'var(--shadow-sm)',
    DEFAULT: 'var(--shadow)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    none: 'none',
  },
  components: {
    input: {
      height: 'var(--input-height)',
    },
    button: {
      height: {
        sm: 'var(--button-height-sm)',
        DEFAULT: 'var(--button-height)',
        lg: 'var(--button-height-lg)',
      },
    },
  },
} as const;

export type Tokens = typeof tokens;
