import {
    GET_STORES,
    FILTER_STORE,
    SEARCH_BY_ID,
    GET_PRODUCT,
    GET_PRODUCT_DETAIL,
    FILTER_PRODUCTS,
    GET_PRODUCT_TYPES,
    ORDER_PRODUCTS,
    ORDER_STORE,
    SEARCH_BY_NAME,
    ALL_PRODUCTS,
    GET_PRODUCT_SUBCATEGORY,
    GET_PRODUCT_STORE_TYPES,
    GET_PRODUCT_STORE_SUBCATEGORY,
    CLEAR_PRODUCTS,
    ORDERS_STORE
} from './actionTypes';
import { STORES_URL, SEARCH_URL } from '../../Scripts/constants';
import axios from 'axios';

export const getStores = () => {
    return async (dispatch) => {
        const response = await axios.get(STORES_URL);
        dispatch({ type: GET_STORES, payload: response.data });
    };
};

export const getAllProducts = ()=> {
    return async (dispatch) => {
        const response = await axios.get('/product');
        dispatch({type: ALL_PRODUCTS, payload:response.data})
    }
}

export const getOrdersStore = (id) => {
    
    return async (dispatch) => {
        const response = await axios.get(`/order/${id}`);
        dispatch({type: ORDERS_STORE, payload: response.data })
    }

}
export const filterStores = (payload) => {
    const obj = {
        state: payload.state,
        types: payload.type,
        name: payload.searchProduct,
        nameStore: payload.searchStore,
        state: payload.searchState,
        // rating: payload.rating
    };
    return async (dispatch) => {
        const response = await axios.post(SEARCH_URL, obj);
        dispatch({ type: FILTER_STORE, payload: response.data });
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
        const store = await axios.get(`/store/${id}`)
        dispatch({ type: SEARCH_BY_ID, payload: store.data });
    };
};


export const getProductsStore = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`/product/${id}`);
        dispatch({ type: GET_PRODUCT, payload: response.data });
    };
};

export const getProductsStorePanel = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`/product/panel/${id}`);
        dispatch({ type: GET_PRODUCT, payload: response.data });
    };
};

export const getProductDetail = (id) => {
    return async (dispatch) => {
        const product = await axios.get(`/product/find/${id}`)
        dispatch({ type: GET_PRODUCT_DETAIL, payload: product.data });
    };
};

export const filterProducts = (id, payload) => {
    console.log("SOY PAYLAOD", payload)
    const obj = {
        types: payload.type,
        name: payload.searchProduct,
        min: payload.min,
        max: payload.max,
        discount: payload.discount,
        subCategory: payload.subCategory,
        order: payload.order ? payload.order : "ALL"
    };
    return async (dispatch) => {
        const response = await axios.post(`/product/filter/${id}`, obj);
        await dispatch({ type: FILTER_PRODUCTS, payload: response.data });
    };
};

export const filterProductsPanel = (id, payload) => {
    const obj = {
        types: payload.type,
        name: payload.searchProduct,
        min: payload.min,
        max: payload.max,
        discount: payload.discount,
        subCategory: payload.subCategory
    };
    return async (dispatch) => {
        const response = await axios.post(`/product/panel/filter/${id}`, obj);
        await dispatch({ type: FILTER_PRODUCTS, payload: response.data });
    };
};

export const getProductTypes = () => {
    return async (dispatch) => {
        const response = await axios.get(`/productType`);
        await dispatch({ type: GET_PRODUCT_TYPES, payload: response.data });
    };
};

export const getProductSubCat = (payload) => {
    const obj = {
        allSub: payload
    }
    return async (dispatch) => {
        const subCategorys = await axios.post('/SubCategory/filter', obj)
        await dispatch({ type: GET_PRODUCT_SUBCATEGORY, payload: subCategorys.data})
    }
}

export const ordersProduct = (payload) => {
    return async (dispatch) => {
        dispatch({ type: ORDER_PRODUCTS, payload });
    };
};

export const ordersStores = (payload) => {
    return async (dispatch) => {
        dispatch({ type: ORDER_STORE, payload });
    };
};

export const clearProducts = (payload) => {
    return {
        type: CLEAR_PRODUCTS,
        payload
    }
}