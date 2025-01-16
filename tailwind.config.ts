import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['var(--font-crimson-text)', 'serif']
      },
      backgroundImage: {
        'body-pattern': "url('/noisy-background-optimized.png')"
      },
      typography: {
        DEFAULT: {
          css: {
            'max-width': 'none',
            color: 'hsl(var(--foreground))',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              lineHeight: '1.75'
            },
            'h1, h2, h3': {
              fontFamily: 'var(--font-crimson-text), serif',
              color: 'hsl(var(--foreground))',
              fontWeight: '600'
            },
            h1: {
              fontSize: '2.25em',
              marginTop: '2em'
            },
            h2: {
              fontSize: '1.875em',
              marginTop: '1.75em'
            },
            h3: {
              fontSize: '1.5em',
              marginTop: '1.5em'
            },
            'ul > li': {
              paddingLeft: '1.5em',
              '&::before': {
                backgroundColor: 'hsl(var(--foreground))'
              }
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
              '&:hover': {
                color: 'hsl(var(--primary))',
                textDecoration: 'underline'
              }
            }
          }
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.75'
          }
        }
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        background: 'hsl(var(--background))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
