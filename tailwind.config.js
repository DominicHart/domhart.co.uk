/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'code-green': '#31beb0',
        'code-blue': '#2568ca',
        'code-gray': '#7a998d',
        'code-dark-gray': '#1e1e1e',
        'code-yellow': '#b8dcaa',
        'code-pink': '#c56c79',
        'code-orange': '#bd8d78'
      },
    },
  },
  plugins: [],
}