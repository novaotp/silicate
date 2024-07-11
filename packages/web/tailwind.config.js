import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    content: ['./src/**/*.{svelte,html,js,ts}'],
    theme: {
        screens: {
            "xsm": "480px",
            ...defaultTheme.screens,
        },
        colors: {
            'primary': {
                '50': '#f4f6fb',
                '100': '#e8ecf6',
                '200': '#ccd7eb',
                '300': '#a0b7d9',
                '400': '#6c90c4',
                '500': '#4a71ad',
                '600': '#375890',
                '700': '#2e4776',
                '800': '#293e63',
                '900': '#273653',
                '950': '#1a2337',
            },
            'neutral': {
                '50': '#f6f6f6',
                '100': '#e7e7e7',
                '200': '#d1d1d1',
                '300': '#b0b0b0',
                '400': '#888888',
                '500': '#757575',
                '600': '#5d5d5d',
                '700': '#4f4f4f',
                '800': '#454545',
                '900': '#3d3d3d',
                '950': '#262626',
            },
            'accent': {
                'success': {
                    '50': '#f0fdf5',
                    '100': '#dcfce9',
                    '200': '#bbf7d4',
                    '300': '#87eeb3',
                    '400': '#31d87a',
                    '500': '#23c46a',
                    '600': '#17a254',
                    '700': '#167f45',
                    '800': '#17643a',
                    '900': '#145332',
                    '950': '#052e19',
                },
                'warning': {
                    '50': '#faffe4',
                    '100': '#f3ffc4',
                    '200': '#e6ff90',
                    '300': '#d1ff50',
                    '400': '#bdff24',
                    '500': '#9be600',
                    '600': '#77b800',
                    '700': '#5a8b00',
                    '800': '#486d07',
                    '900': '#3d5c0b',
                    '950': '#1e3400'
                },
                'danger': {
                    '50': '#fff1f1',
                    '100': '#ffe0e0',
                    '200': '#ffc7c7',
                    '300': '#ffa0a0',
                    '400': '#ff6969',
                    '500': '#f93a3a',
                    '600': '#e71d1d',
                    '700': '#c21313',
                    '800': '#a01414',
                    '900': '#851717',
                    '950': '#490606',
                },
                
            },
            'transparent': '#00000000',
            'white': '#ffffff',
            'black': '#000000'
        }
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.flex-center': {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }
            })
        })
    ],
}
