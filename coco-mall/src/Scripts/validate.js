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
};

export default validate;