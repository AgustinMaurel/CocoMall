import { SHOPPING_CART_TYPES } from './actionTypes';

export function addToCart(id) {
    return { type: SHOPPING_CART_TYPES.ADD_TO_CART, payload: id };
}

export const deleteFromCart = (id) => {
    return { type: SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART, payload: id };
};
export const deleteAllFromCart = (id) => {
    return { type: SHOPPING_CART_TYPES.REMOVE_ALL_FROM_CART, payload: id };
};

export const clearCart = () => {
    return { type: SHOPPING_CART_TYPES.CLEAR_CART };
};

export const setCart = (payload) => {
    return { type: SHOPPING_CART_TYPES.SET_TO_CART, payload };
};
