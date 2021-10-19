import {
    GET_STORES,
    SEARCH_BY_ID,
    GET_PRODUCT,
    POST_STORE,
    GET_PRODUCT_DETAIL,
    FILTER_PRODUCTS,
    GET_PRODUCT_TYPES,
    ORDER_PRODUCTS,
    FILTER_STORE,
    ALL_PRODUCTS,
    ORDER_STORE,
    GET_PRODUCT_SUBCATEGORY,
    GET_PRODUCT_STORE_TYPES,
    GET_PRODUCT_STORE_SUBCATEGORY,
    CLEAR_PRODUCTS,
    ORDERS_STORE
} from '../actions/actionTypes';

const initialState = {
    allStores: [],
    storesFilters: [],
    storeDetail: {},
    storeProducts: [],
    storeProductsFilter: [],
    productDetail: {}, //deberiamos pasarlo a local
    productTypes: [],
    productSubCat: [],
    storeCreated: {},
    allProducts:[] ,// considerar pasarlo a estado local ya que es un post y se utiliza en un solo componente
    orderStore : []
};

export const storeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        
        case ORDERS_STORE: 
        return {
            ...state, 
            orderStore: payload
        }
        case GET_STORES:
            return {
                ...state,
                allStores: payload,
                storesFilters: payload,
            };
            case ALL_PRODUCTS : 
            console.log(payload)
            return {
                ...state,
                allProducts: payload
            }
        case CLEAR_PRODUCTS :
            return {
                ...state,
                storesProducts: payload,
                storeProductsFilter: payload

            }
        case POST_STORE:
            return {
                ...state,
                storeCreated: payload,
            };

        case FILTER_STORE:
            return {
                ...state,
                storesFilters: payload,
            };
        case SEARCH_BY_ID:
            return {
                ...state,
                storeDetail: payload
            };
        case GET_PRODUCT:
            return {
                ...state,
                storeProducts: payload,
                storeProductsFilter: payload,
            };

        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: payload,
            };

        case FILTER_PRODUCTS:
            return {
                ...state,
                storeProductsFilter: payload,
            };

        case GET_PRODUCT_TYPES:
            return {
                ...state,
                productTypes: payload,
            };
            
        case GET_PRODUCT_SUBCATEGORY:
            return {
                ...state,
                productSubCat: payload
            }
        //usar .slice() para actualiar el estado en los order
        case ORDER_PRODUCTS:
            if (payload === 'Barato') {
                let copy = state.storeProductsFilter
                    .sort(function (a, b) {
                        return a.price - b.price;
                    })
                    .slice();
                return {
                    ...state,
                    storeProductsFilter: copy,
                };
            }
            if (payload === 'Caro') {
                let copy = state.storeProductsFilter
                    .sort(function (a, b) {
                        return b.price - a.price;
                    })
                    .slice();
                return {
                    ...state,
                    storeProductsFilter: copy,
                };
            }
            if (payload === 'A-Z') {
                let copy = state.storeProducts.sort((a, b) => {
                    if (a.productName > b.productName) {
                        return 1;
                    }
                    if (b.productName > a.productName) {
                        return -1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    storeProductsFilter: copy,
                };
            }
            if (payload === 'Z-A') {
                let copy = state.storeProducts.sort((a, b) => {
                    if (a.productName > b.productName) {
                        return -1;
                    }
                    if (b.productName > a.productName) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    storeProductsFilter: copy,
                };
            }
            if (payload === 'Price') {
                let copy = state.storeProducts.sort((a, b) => {
                    if (a.price > b.price) {
                        return 1;
                    }
                    if (b.price > a.price) {
                        return -1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    storeProductsFilter: copy,
                };
            }
            if (payload === 'Stock') {
                let copy = state.storeProducts.sort((a, b) => {
                    if (a.stock > b.stock) {
                        return 1;
                    }
                    if (b.stock > a.stock) {
                        return -1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    storeProductsFilter: copy,
                };
            } else {
                return {
                    ...state,
                    storeProductsFilter: state.storeProductsFilter
                        .sort(function (a, b) {
                            if (a.productName > b.productName) return 1;
                            if (b.productName > a.productName) return -1;
                            return 0;
                        })
                        .slice(),
                };
            }

        default:
            return state;
    }
};
