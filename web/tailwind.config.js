/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.svelte'],
    theme: {
        extend: {
            screens: {
                "xsm": "480px"
            }
        },
    },
    plugins: [],
}
