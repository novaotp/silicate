import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.svelte'],
    theme: {
        screens: {
            "xsm": "480px",
            ...defaultTheme.screens,
        }
    },
    plugins: [],
}
