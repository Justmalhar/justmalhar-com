import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0d10',
        foreground: '#f5f7fa',
        muted: '#9aa4b2',
        accent: '#7c3aed',
        card: '#12161b',
        border: '#1f2937'
      }
    },
  },
  plugins: [],
};

export default config;
