import axios from 'axios';
import { PRODUCT_CREATE_URL, STORE_CREATE_URL } from './constants';

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
    return () => {
        axios
            .post(`${STORE_CREATE_URL}`, payload)
            .then((res) => res.data)
            .then((product) => {
                return product;
            })
            .catch((error) => console.log(error));
    };
}
