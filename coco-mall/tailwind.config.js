module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: "class", // or 'media' or 'class'
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
        borderColor: (theme) => ({
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

            md: '547px',

            lg: '768px',

            xl: '1024px',

            '2xl': '1680px',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
