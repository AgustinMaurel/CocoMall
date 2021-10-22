const validate = {
    name: {
        required: { value: true, message: 'name is required' },
        minLength: {
            value: 4,
            message: 'name must contain at least 4 characters',
        },
        maxLength: {
            value: 15,
            message: 'name must contain a maximum of 15 characters ',
        },
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'name can only be letters',
        },
    },

    cbu : {
        required: { value: true, message: 'CBU/CVU is required' },
        minLength: {
            value: 22,
            message: 'CBU must contain 22 numbers ',
        },
        maxLength: {
            value: 22,
            message: 'CBU must contain 22 numbers ',
        },
        pattern: {
            value: /^\d{22}$/,
            message: 'CBU can only be numbers',
        },
    },

    lastname: {
        required: { value: true, message: 'lastName is required' },
        minLength: {
            value: 4,
            message: 'lastName must contain at least 4 characters',
        },
        maxLength: {
            value: 15,
            message: 'lastName must contain a maximum of 15 characters ',
        },
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'lastName can only be letters',
        },
    },

    email: {
        required: { value: true, message: 'email is required' },
        pattern: {
            value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
            message: 'email is invalid',
        },
    },

    password: {
        required: { value: true, message: 'password is required' },
        minLength: {
            value: 6,
            message: 'password must contain at least 8 characters',
        },
        maxLength: {
            value: 16,
            message: 'password must contain a maximum of 16 characters ',
        },
        pattern: {
            value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            message:
                'Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters',
        },
    },

    product: {
        required: { value: true, message: 'Product is required' },
        minLength: {
            value: 2,
            message: 'Product must contain at least 2 characters',
        },
        maxLength: {
            value: 40,
            message: 'Product must contain a maximum of 40 characters ',
        },
    },

    description: {
        required: { value: true, message: 'Description is required' },
        minLength: {
            value: 2,
            message: 'Description must contain at least 2 characters',
        },
        maxLength: {
            value: 255,
            message: 'Description must contain a maximum of 255 characters ',
        },
    },

    price: {
        required: { value: true, message: 'Price is required' },
        min: {
            value: 1,
            message: 'Price min',
        },
        max: {
            value: 9999999999,
            message: 'Price maximum',
        },
    },

    image: { required: true, message: 'Image is required' },

    storeName: {
        required: { value: true, message: 'Store name is required' },
        minLength: {
            value: 4,
            message: 'Store must contain at least 2 characters',
        },
        maxLength: {
            value: 40,
            message: 'Store must contain a maximum of 40 characters ',
        },
        pattern: {
            value: /^[\w\s]+([a-zA-ZÀ-ÿ\u00f1\u00d1](\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)[a-zA-ZÀ-ÿ\u00f1\u00d1])$/gm,
            message: 'Store can only be letters',
        },
    },

    descriptionStore: {
        required: { value: true, message: 'Description is required' },
        minLength: {
            value: 4,
            message: 'Description must contain at least 4 characters',
        },
        maxLength: {
            value: 62,
            message: 'Description must contain a maximum of 62 characters ',
        },
    },

    subCategory: {
        minLength: {
            value: 3,
            message: 'Category must contain at least 2 characters',
        },
        maxLength: {
            value: 25,
            message: 'Category must contain a maximum of 16 characters ',
        },
    },
};

export default validate;
