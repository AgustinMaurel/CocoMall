import axios from 'axios';
import { PRODUCT_URL } from '../../Scripts/constants';
import { POST_STORE } from './actionTypes';

export const postShop = (shop) => {
    return async function (dispatch) {
        axios
            .post('https://localhost3001/create/shop', shop)
            .then((response) => dispatch({ type: POST_STORE, payload: response.data }));
    };
};

//create product data
export function postProduct(payload) {
    return () => {
      axios
        .post(`${PRODUCT_URL}`, payload)
        .then((res) => res.data)
        .then((product) => {
          return product;
        })
        .catch((error) => console.log(error));
    };
}
