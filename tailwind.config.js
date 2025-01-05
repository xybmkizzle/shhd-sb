/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#f2d9f7',
          300: '#e2b0ee',
          400: '#cb6ce6', // Main purple color
          500: '#cb6ce6',
          600: '#cb6ce6',
          700: '#b462cc',
          800: '#9d58b3',
          900: '#864e99',
        },
      },
    },
  },
  plugins: [],
};