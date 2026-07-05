/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#007AFF',
          gray: {
            50: '#f5f5f7',
            100: '#e8e8ed',
            150: '#e0e0e5',
            200: '#d2d2d7',
            300: '#aeaeb2',
            400: '#8e8e93',
            500: '#6e6e73',
            600: '#48484a',
            700: '#363639',
            800: '#272729',
            900: '#1d1d1f',
          }
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', '"SFMono-Regular"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'heading': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '700' }],
        'subhead': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'body': ['1.0625rem', { lineHeight: '1.47059' }],
        'caption': ['0.8125rem', { lineHeight: '1.38462', letterSpacing: '0' }],
      },
      maxWidth: {
        'content': '680px',
        'page': '980px',
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0,0,0,0.06)',
        'apple-md': '0 4px 6px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.05)',
        'apple-lg': '0 10px 15px rgba(0,0,0,0.03), 0 4px 6px rgba(0,0,0,0.04)',
        'apple-inner': 'inset 0 1px 0 rgba(255,255,255,0.5)',
      },
      letterSpacing: {
        'apple': '0.016em',
      }
    }
  }
};
