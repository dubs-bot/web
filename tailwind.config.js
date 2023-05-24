/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          black: "#1e1f22",
          dark: "#2b2d31",
          light: "#313338",
          text: "#80848e",
          primary: "#5865f2"
        }
      }
    },
  },
  plugins: [],
}
