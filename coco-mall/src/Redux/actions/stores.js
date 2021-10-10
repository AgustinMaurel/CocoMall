import {
    GET_STORES,
    FILTER_STORE,
    SEARCH_BY_ID,
    GET_PRODUCT,
    GET_PRODUCT_DETAIL,
    FILTER_PRODUCTS,
    GET_PRODUCT_TYPES,
    ORDER_PRODUCTS
} from './actionTypes';
import { STORES_URL, SEARCH_URL, BASE_URL } from '../../Scripts/constants';
import axios from 'axios';

export const getStores = () => {
    return async (dispatch) => {
        const response = await axios.get(STORES_URL);
        dispatch({ type: GET_STORES, payload: response.data });
    };
};

export const filterStores = (payload) => {
    const obj = {
        state: payload.state,
        types: payload.type,
        name: payload.searchProduct,
        nameStore: payload.searchStore,
        rating: payload.rating
    };
    console.log("OBJ",obj)
    return async (dispatch) => {
        const response = await axios.post(SEARCH_URL, obj);
        console.log("RESPONSE", response.data)
        dispatch({ type: FILTER_STORE, payload: response.data });
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

export const getProductDetail = (id) => {
    return async (dispatch) => {
        dispatch({ type: GET_PRODUCT_DETAIL, payload: id });
    };
};

export const filterProducts = (id, payload) => {
    const obj = {
        types: payload.type,
        name: payload.searchProduct,
        min: payload.min,
        max: payload.max,
        discount: payload.discount
    };
    return async (dispatch) => {
        const response = await axios.post(`${BASE_URL}/product/filter/${id}`,obj );
        console.log(response.data);
        await dispatch({ type: FILTER_PRODUCTS, payload: response.data });
    };
};

export const getProductTypes = () => {
    return async (dispatch) => {
        const response = await axios.get(`${BASE_URL}/productType`)
        await dispatch({type: GET_PRODUCT_TYPES, payload: response.data})
    }
}

export const ordersProduct = (payload) => {
    return async (dispatch) => {
        dispatch({ type: ORDER_PRODUCTS, payload})
    }
}