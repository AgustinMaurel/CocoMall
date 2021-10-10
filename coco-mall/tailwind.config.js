module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#ff4800',
                blue: {
                    450: '#5F99F7',
                },

                'cocoMall': {
                    DEFAULT: '#38A3A5',
                    '50': '#D3EFF0',
                    '100': '#C0E9E9',
                    '200': '#99DBDD',
                    '300': '#73CED0',
                    '400': '#4DC1C3',
                    '500': '#38A3A5',
                    '600': '#2B7D7F',
                    '700': '#1E5859',
                    '800': '#113233',
                    '900': '#040D0D'
                },
            },

            gridTemplateRows: {
                // Simple 8 row grid  
               8: 'repeat(8, minmax(0, 1fr))',  
               14: 'repeat(14, minmax(0, 1fr))',  
                // Complex site-specific row configuration  
               'layout': '200px minmax(900px, 1fr) 100px',
            }, 
           
            outline:{
            primary: ['2px solid #38A3A5, 1px'],
            'primary-light': ['2px solid #AFDADB, 1px'],
            secondary: ['2px solid #2EC5CE, 1px'],
            'secondary-light': ['2px solid #D7EDED, 1px'],
            },

            gridRow: {
                'span-7': 'span 7 / span 7',
                'span-8': 'span 8 / span 8',
                'span-9': 'span 9 / span 9',
                'span-10': 'span 10 / span 10',
                'span-11': 'span 11 / span 11',
                'span-12': 'span 12 / span 12',           
                'span-13': 'span 13 / span 13',           
                'span-14': 'span 14 / span 14',           
                'span-15': 'span 15 / span 15',           
                
            }  ,
        },
       
        backgroundColor: (theme) => ({
            ...theme('colors'),
            primary: '#38A3A5',
            'primary-light': '#AFDADB',
            secondary: '#2EC5CE',
            'secondary-light': '#D7EDED',
        }),
        textColor: (theme) => ({
            ...theme('colors'),
            primary: '#38A3A5',
            'primary-light': '#AFDADB',
            secondary: '#2EC5CE',
            'secondary-light': '#D7EDED',
        }),
        borderColor: (theme) => ({
            ...theme('colors'),
            primary: '#38A3A5',
            'primary-light': '#AFDADB',
            secondary: '#2EC5CE',
            'secondary-light': '#D7EDED',
        }),
        container: {
            center: true,
        },
        screens: {
            sm: '440px',

            md: '547px',

            lg: '768px',

            xl: '1024px',

            '2xl': '1280px',
        },
    },
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked'],
        },
    },
    plugins: [
        require('@tailwindcss/custom-forms'),
    ],
};
