/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg-2)',
        card: 'var(--card)',
        elevated: 'var(--elevated)',
        line: 'var(--border)',
        ink: 'var(--text)',
        ink2: 'var(--text-2)',
        ink3: 'var(--text-3)',
        cyan: { DEFAULT: 'var(--cyan)' },
        indigo: { DEFAULT: 'var(--indigo)' },
        gold: { DEFAULT: 'var(--gold)' },
        amber: { DEFAULT: 'var(--amber)' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
