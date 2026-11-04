/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        canvas: { bg: '#0b0d10', panel: '#12151a', line: '#262b33', accent: '#7c9cff' },
      },
    },
  },
  plugins: [],
}
