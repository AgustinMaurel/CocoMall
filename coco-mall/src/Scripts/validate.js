const validate = {
    product: {
        required: { value: true, message: 'product is required' },
        minLength: {
            value: 2,
            message: 'product must contain at least 2 characters',
        },
        maxLength: {
            value: 16,
            message: 'product must contain a maximum of 16 characters ',
        },
    },
    description: {
        required: { value: true, message: 'description is required' },
        minLength: {
            value: 2,
            message: 'description must contain at least 2 characters',
        },
        maxLength: {
            value: 40,
            message: 'description must contain a maximum of 40 characters ',
        },
    },
    price: {
        required: { value: true, message: 'price is required' },
        min: {
            value: 1,
            message: 'price min',
        },
        max: {
            value: 9999999999,
            message: 'price maximum',
        },
    },
    image: { required: true, message: 'image is required' },
};

export default validate;