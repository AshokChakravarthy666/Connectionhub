/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",], theme: {
        extend: {
            colors: {
                primary: '#fcfcfc',
                secondary: '#949494',
                background: '#121212',
                background2: '#1c1c1c',
                accentColor: '#4C4CFF',
                accentColor2: '#F8E71C',
                accentColor3: '#FF0000',
            }
        },
    }, plugins: [], darkMode: 'class'
}

