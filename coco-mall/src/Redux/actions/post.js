import axios from 'axios';
import { POST_STORE } from './actionTypes';

export const postShop = (shop) => {
    return async function (dispatch) {
        axios
            .post('https://localhost3001/create/shop', shop)
            .then((response) => dispatch({ type: POST_STORE, payload: response.data }));
    };
};
