/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#d4be7d',
                secondary: '#ffc400',
                tertiary: '#392100',
                accent: '#7d2b0d',
                dinkumBeige: '#fdf4e4',
                dinkumGray: '#e3dbcd'
            }
        },
        fontFamily: {
            dinkum: ['McLaren']
        }
    },
    plugins: [],
}