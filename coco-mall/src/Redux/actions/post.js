import axios from 'axios';
import { POST_STORE, POST_PRODUCT } from './actionTypes';

export const postShop = (shop) => {
    return async function (dispatch) {
        axios
            .post('https://localhost3001/create/shop', shop)
            .then((response) => dispatch({ type: POST_STORE, payload: response.data }));
    };
};

//create product data
export const postProduct = (product) => {
    return async function (dispatch) {
        axios
            .post('https://localhost3001/product', product)
            .then((response) => dispatch({ type: POST_PRODUCT, payload: response.data }));
    };
};
