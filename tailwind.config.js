/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sukhumvit': ['Sukhumvit Set', 'sans-serif'],
      },
      colors: {
        'brand-yellow': '#f5c518',
      },
    },
  },
  plugins: [],
}