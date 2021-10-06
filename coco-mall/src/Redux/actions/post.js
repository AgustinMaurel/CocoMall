import axios from 'axios';
import { PRODUCT_CREATE_URL, STORE_CREATE_URL } from '../../Scripts/constants';
import { POST_STORE } from './actionTypes';

//create product data
export function postProduct(payload) {
    return () => {
        axios
            .post(`${PRODUCT_CREATE_URL}`, payload)
            .then((res) => res.data)
            .then((product) => {
                return product;
            })
            .catch((error) => console.log(error));
    };
}

//create store
export function postStore(payload) {
    return (dispatch) => {
        axios
            .post(`${STORE_CREATE_URL}`, payload)
            .then((res) => res.data)
            .then((store) => {
                dispatch({ type: POST_STORE, payload: store });
            })
            .catch((error) => console.log(error));
    };
}
