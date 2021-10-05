import { SHOPPING_CART_TYPES } from '../actions/actionTypes';

export const shoppingInitialState = {
    products: [
        { id: 1, name: 'Remerita Piola', price: 2000 },
        { id: 2, name: 'Remerita Piola 1', price: 6000 },
        { id: 3, name: 'Remerita Piola 2', price: 600 },
        { id: 4, name: 'Remerita Piola 3', price: 750 },
        { id: 5, name: 'Remerita Piola 4', price: 100 },
        { id: 6, name: 'Remerita Piola 5', price: 500 },
    ],
    cart: [],
};

export function shoppingReducer(state = shoppingInitialState, { type, payload }) {
    switch (type) {
        case SHOPPING_CART_TYPES.ADD_TO_CART: {
            let newItem = state.products.find((item) => item.id === payload);
            let repeatedItem = state.cart.find((item) => item.id === newItem.id);

            return repeatedItem
                ? {
                      ...state,
                      cart: state.cart.map((item) =>
                          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
                      ),
                  }
                : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
        }
        case SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.cart.find((item) => item.id === payload);

            return itemToDelete.quantity > 1
                ? {
                      ...state,
                      cart: state.cart.map((item) =>
                          item.id === payload ? { ...item, quantity: item.quantity - 1 } : item,
                      ),
                  }
                : { ...state, cart: state.cart.filter((item) => item.id !== payload) };
        }

        case SHOPPING_CART_TYPES.REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== payload),
            };
        }

        case SHOPPING_CART_TYPES.CLEAR_CART: {
            return shoppingInitialState;
        }

        default:
            return state;
    }
}
