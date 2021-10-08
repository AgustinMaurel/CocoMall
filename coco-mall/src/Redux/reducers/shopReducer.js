import { GET_STORES, SEARCH_BY_NAME, SEARCH_BY_ID, GET_PRODUCT, ADD_ITEMS_TO_CART } from '../actions/actionTypes';

const initialState = {
    allStores: [],
    
    storeDetail: {},
    storeProducts: [],
    itemsInCart: 0
};

export const storeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_STORES:
            return {
                ...state,
                allStores: payload,
            };

        case SEARCH_BY_NAME:
            return {
                ...state,
                storesByName: payload,
            };

        case SEARCH_BY_ID:
            return {
                ...state,
                storeDetail: state.allStores.find((store) => {
                    return store.id === payload;
                }),
            };

        case GET_PRODUCT:
            return {
                ...state,
                storeProducts: payload,
            };

        case ADD_ITEMS_TO_CART:
            return {
                ...state,
                itemsInCart: state.itemsInCart + payload
            }

        default:
            return state;
    }
};
