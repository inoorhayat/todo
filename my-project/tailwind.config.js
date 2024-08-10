/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hot-pink':'#EF7C8E',
        'spearmint': '#B6E2D3',
        'cream':'#FAE8E0',
        'rosewater':'#D8A7B1'
      },
    },
  },
  plugins: [],
}