/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
      colors: {
        "bg-color": "var(--background-color)",
        "text-color": "var(--text-color)",
        "primary-color": "var(--primary-color)",
        "opposite-text-color": "var(--opposite-text-color)",
      },
    }
  },
  plugins: [],
}
