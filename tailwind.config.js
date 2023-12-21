/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: ["class"],
    theme: {
        extend: {
            colors: {
                "bg-color": "var(--background-color)",
                "text-color": "var(--text-color)",
                "primary-color": "var(--primary-color)",
                "opposite-text-color": "var(--opposite-text-color)",
            },
        },
    },
    plugins: [],
};
