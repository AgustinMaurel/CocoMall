import { GET_STORES, SEARCH_BY_NAME, SEARCH_BY_ID, GET_PRODUCT,  ADD_ITEMS_TO_CART } from './actionTypes';
import { STORES_URL, SEARCH_URL, BASE_URL } from '../../Scripts/constants';
import axios from 'axios';

export const getStores = () => {
    return async (dispatch) => {
        const response = await axios.get(STORES_URL);
        dispatch({ type: GET_STORES, payload: response.data });
    };
};

export const getStoresByName = () => {
    return async (dispatch) => {
        const response = await axios.get(SEARCH_URL);
        dispatch({ type: SEARCH_BY_NAME, payload: response.data });
    };
};

export const getStoreDetail = (id) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_BY_ID, payload: id });
    };
};

export const getProductsStore = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`${BASE_URL}/product/${id}`);
        dispatch({ type: GET_PRODUCT, payload: response.data });
    };
};

export const addItemsToCart=(quantity) => {
    return {type: ADD_ITEMS_TO_CART, payload:quantity}
}
