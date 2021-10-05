import { SHOPPING_CART_TYPES } from '../actions/actionTypes';

export const shoppingInitialState = {
    products: [
        { id: 1, name: 'Remerita Piola', price: 2000 },
        { id: 2, name: 'Remerita Piola1', price: 6000 },
        { id: 3, name: 'Remerita Piola2', price: 600 },
        { id: 4, name: 'Remerita Piola3', price: 750 },
        { id: 5, name: 'Remerita Piola4', price: 100 },
        { id: 6, name: 'Remerita Piola5', price: 500 },
    ],
    cart: [],
};

export function shoppingReducer(state = shoppingInitialState, { type, payload }) {
    switch (type) {
        case SHOPPING_CART_TYPES.ADD_TO_CART: {
        }
        case SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART: {
        }

        case SHOPPING_CART_TYPES.REMOVE_ALL_FROM_CART: {
        }

        case SHOPPING_CART_TYPES.CLEAR_CART: {
        }

        default:
            return state;
    }
}
