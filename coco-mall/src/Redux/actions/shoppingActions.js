import axios from 'axios';
import { SHOPPING_CART } from '../../Scripts/constants';
import { SHOPPING_CART_TYPES } from './actionTypes';

export const addToCartSomo = (uid, idItem, que, cant) => {
    return (dispatch) => {
        axios
            .post(SHOPPING_CART.RUTA_SOMO, {
                id: uid,
                item: {
                    idProduct: idItem,
                    quantity: 1,
                },
                que,
                cant,
            })
            .then((res) => {
                console.log(res.data);
                return dispatch({ type: SHOPPING_CART_TYPES.ADD_TO_CART, payload: res.data }); // RECIBE: id(id usuario), item(itemid), que("+" o "-"), cant(cantidad de items que agrego o saco)
            });
    };
};
export const cartDeleteSomo = (uid, idItem) => {
    return (dispatch) => {
        axios
            .post(SHOPPING_CART.RUTA_SOMO, {
                id: uid,
                item: {
                    idProduct: idItem,
                    quantity: '1',
                },
                que: '-',
                cant: '1',
            })
            .then((res) => {
                console.log(res.data);
                return dispatch({
                    type: SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART,
                    payload: res.data,
                }); // RECIBE: id(id usuario), item(itemid), que("+" o "-"), cant(cantidad de items que agrego o saco)
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
