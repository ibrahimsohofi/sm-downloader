/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          DEFAULT: '#FF8A30', // Orange
          hover: '#F67700',
        },
      },
      boxShadow: {
        'custom-light': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'custom-dark': '0 4px 20px -2px rgba(255, 255, 255, 0.03)',
      },
    },
  },
  plugins: [],
}
