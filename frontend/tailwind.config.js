/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f7f7ed",
        secondary: "#151618",
      },

      fontFamily: {
        unbounded: ['Unbounded', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif']
      },
    },
  },
  plugins: [],
}

