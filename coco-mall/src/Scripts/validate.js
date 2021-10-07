const validate = {
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
    cp : {
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
    descriptionStore : {
        required: { value: true, message: 'Description is required' },
        minLength: {
            value: 4,
            message: 'Description must contain at least 4 characters',
        },
        maxLength: {
            value: 255,
            message:
                'Description must contain a maximum of 255 characters ',
        },
    }
};

export default validate;
