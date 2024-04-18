import konstaConfig from 'konsta/config';

/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default konstaConfig(config);
