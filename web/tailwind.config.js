import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.svelte'],
    theme: {
        extend: {
            borderRadius: {
                "smd": "4px"
            }
        },
        screens: {
            "xsm": "480px",
            ...defaultTheme.screens,
        }
    },
    plugins: [],
}
