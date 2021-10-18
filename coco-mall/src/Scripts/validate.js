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

    lastname: {
        required: { value: true, message: 'lastName is required' },
        minLength: {
            value: 4,
            message: 'lastName must contain at least 4 characters',
        },
        maxLength: {
            value: 15,
            message:
                'lastName must contain a maximum of 15 characters ',
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
            message:
                'password must contain a maximum of 16 characters ',
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
            value: 16,
            message: 'Product must contain a maximum of 16 characters ',
        },
    },
    description: {
        required: { value: true, message: 'Description is required' },
        minLength: {
            value: 2,
            message: 'Description must contain at least 2 characters',
        },
        maxLength: {
            value: 40,
            message: 'Description must contain a maximum of 40 characters ',
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
            value: 15,
            message: 'Store must contain a maximum of 20 characters ',
        },
        pattern: {
            value: /^[\w\s]+([a-zA-ZÀ-ÿ\u00f1\u00d1](\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)[a-zA-ZÀ-ÿ\u00f1\u00d1])$/gm,
            message: 'Store can only be letters',
        },
    },
    country: {
        required: { value: true, message: 'Country is required' },
        minLength: {
            value: 4,
            message: 'Country must contain at least 4 characters',
        },
        maxLength: {
            value: 20,
            message: 'Country must contain a maximum of 20 characters ',
        },
        pattern: {
            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1](\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/gm,
            message: 'Country can only be letters',
        },
    },
    state: {
        required: { value: true, message: 'State is required' },
        minLength: {
            value: 4,
            message: 'State must contain at least 4 characters',
        },
        maxLength: {
            value: 20,
            message: 'State must contain a maximum of 20 characters ',
        },
        pattern: {
            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1](\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/gm,
            message: 'State can only be letters',
        },
    },
    address: {
        required: { value: true, message: 'Address is required' },
        minLength: {
            value: 4,
            message: 'Address must contain at least 4 characters',
        },
        maxLength: {
            value: 15,
            message: 'Address must contain a maximum of 15 characters ',
        },
        pattern: {
            value: /[A-Za-zÀ-ÖØ-öø-ÿ]+[ ][0-9]+/i,
            message: 'Wrong adress type',
        },
    },
    cp: {
        required: { value: true, message: 'Area Code is required' },
        minLength: {
            value: 4,
            message: 'Area Code must contain at least 4 numbers',
        },
        maxLength: {
            value: 15,
            message: 'Area Code must contain a maximum of 15 numbers ',
        },
        pattern: {
            value: /^\d+$/gm,
            message: 'Wrong postal code',
        },
    },
    descriptionStore: {
        required: { value: true, message: 'Description is required' },
        minLength: {
            value: 4,
            message: 'Description must contain at least 4 characters',
        },
        maxLength: {
            value: 255,
            message: 'Description must contain a maximum of 255 characters ',
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
