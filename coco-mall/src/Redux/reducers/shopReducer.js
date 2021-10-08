import {
    GET_STORES,
    SEARCH_BY_NAME,
    SEARCH_BY_ID,
    GET_PRODUCT,
    SHOPPING_CART_TYPES,
    GET_PRODUCT_DETAIL,
    FILTER_PRODUCTS,
    POST_STORE
} from '../actions/actionTypes';

const initialState = {
    allStores: [],
    storesByName: {},
    storeDetail: {},
    storeProducts: [],
    storeProductsFilter: [],
    productDetail: {},
    cart: [],
    storeCreated: {}
};

export const storeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_STORES:
            return {
                ...state,
                allStores: payload,
            };

        case POST_STORE:
            return {
                ...state,
                storeCreated: payload,
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
                storeProductsFilter: payload
            };

        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: state.storeProducts.find((product) => {
                    return product.id === payload;
                }),
            };

        case FILTER_PRODUCTS: 
        return { 
            ...state,
            storeProductsFilter: payload
        }

        case SHOPPING_CART_TYPES.ADD_TO_CART: {
            let newItem = state.storeProducts?.find((item) => item.id === payload);
            let repeatedItem = state.cart?.find((item) => item.id === newItem.id);

            return repeatedItem
                ? {
                      ...state,
                      cart: state.cart.map((item) =>
                          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
                      ),
                  }
                : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
        }
        case SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.cart.find((item) => item.id === payload);

            return itemToDelete.quantity > 1
                ? {
                      ...state,
                      cart: state.cart.map((item) =>
                          item.id === payload ? { ...item, quantity: item.quantity - 1 } : item,
                      ),
                  }
                : { ...state, cart: state.cart.filter((item) => item.id !== payload) };
        }

        case SHOPPING_CART_TYPES.REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== payload),
            };
        }

        case SHOPPING_CART_TYPES.CLEAR_CART: {
            return {
                ...state,
                cart: [],
            };
        }

        default:
            return state;
    }
};
