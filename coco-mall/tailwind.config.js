module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#ff4800',
                blue: {
                    450: '#5F99F7',
                },
            },
        },
        backgroundColor: (theme) => ({
            ...theme('colors'),
            primary: '#38A3A5',
            'primary-light': 'RGB(175, 218, 219)',
            secondary: '#2EC5CE',
            'secondary-light': 'RGB(175, 218, 189)',
        }),
        textColor: (theme) => ({
            ...theme('colors'),
            primary: '#38A3A5',
            'primary-light': 'RGB(175, 218, 219)',
            secondary: '#2EC5CE',
            'secondary-light': 'RGB(175, 218, 189)',
        }),
        container: {
            center: true,
        },
        screens: {
            sm: '440px',
            // => @media (min-width: 640px) { ... }

            md: '547px',
            // => @media (min-width: 768px) { ... }

            lg: '768px',
            // => @media (min-width: 1024px) { ... }

            xl: '1024px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1680px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
