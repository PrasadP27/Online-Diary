/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#333333",
        darkPrimary: "#e6e5e1"
      },

      fontFamily: {
        unbounded: ['Unbounded', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif']
      },
    },
  },
  plugins: [],
  darkMode: "class"
}

