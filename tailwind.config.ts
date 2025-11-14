import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',

        // Primary colors (OKLCH)
        black: 'var(--color-black)',
        gray: 'var(--color-gray)',
        white: 'var(--color-white)',

        // Functional colors
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
        info: 'var(--info)',
      },
      fontFamily: {
        sans: ['Switzer', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Display scales (responsive)
        'display-xl': ['4.5rem', { lineHeight: '1.1' }],  // 72px
        'display-lg': ['3.75rem', { lineHeight: '1.1' }], // 60px
        'display-md': ['3rem', { lineHeight: '1.15' }],   // 48px
      },
      lineHeight: {
        tight: '1.25',
        relaxed: '1.625',
      },
      letterSpacing: {
        tighter: '-0.025em',
        wider: '0.05em',
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        medium: '300ms',
        slow: '500ms',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
    darkTheme: 'dark',
    base: false,
    styled: true,
    utils: true,
  },
} satisfies Config
