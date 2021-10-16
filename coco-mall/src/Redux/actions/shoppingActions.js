import axios from 'axios';
import { SHOPPING_CART } from '../../Scripts/constants';
import { SHOPPING_CART_TYPES } from './actionTypes';

export function addToCart(id, quantity) {
    return { type: SHOPPING_CART_TYPES.ADD_TO_CART, payload: { id, quantity } };

    // console.log(id, 'product id');
    // console.log(cartUser, 'userCart');
    // console.log(userId, 'userID');

    // quantity++;

    // console.log(quantity, 'quantity');

    // return (dispatch) => {
    //     axios
    //         .post(
    //             SHOPPING_CART.ADD_TO_CART,

    //             {
    //                 userId: userId,
    //                 cart: cartUser?.map((item) => {
    //                     if (item.id === id)
    //                         return {
    //                             id,
    //                             quantity: quantity,
    //                         };
    //                     else
    //                         return {
    //                             id: item.id,
    //                             quantity: quantity,
    //                         };
    //                 }),
    //             },
    //         )
    //         .then((res) => {
    //             console.log(res.data, 'RES.DATA');
    //             return dispatch({
    //                 type: SHOPPING_CART_TYPES.ADD_TO_CART,
    //                 payload: res.data,
    //             });
    //         });
    // };
}

export const deleteFromCart = (id, quantity, cartUser, userId) => {
    quantity--;

    return (dispatch) => {
        axios
            .post(
                SHOPPING_CART.ADD_TO_CART,

                {
                    userId: userId,
                    cart: cartUser?.map((item) => {
                        if (item.id === id)
                            return {
                                id,
                                quantity: quantity,
                            };
                        else
                            return {
                                item,
                            };
                    }),
                },
            )
            .then((res) => {
                return dispatch({
                    type: SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART,
                    payload: res.data,
                });
            });
    };
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
