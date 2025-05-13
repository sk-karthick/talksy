// tailwind.config.js
module.exports = {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                'zoom-pulse': 'zoomPulse 1.5s ease-in-out infinite',
            },
            keyframes: {
                zoomPulse: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                }
            }
        },
    },
    plugins: [],
    safelist: [
        'animate-zoom-pulse',
    ]
}