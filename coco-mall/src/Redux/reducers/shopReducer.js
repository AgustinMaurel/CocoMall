import {
    GET_STORES,
    SEARCH_BY_ID,
    GET_PRODUCT,
    SHOPPING_CART_TYPES,
    POST_STORE,
    GET_PRODUCT_DETAIL,
    FILTER_PRODUCTS,
    GET_PRODUCT_TYPES,
    ORDER_PRODUCTS,
    FILTER_STORE
} from '../actions/actionTypes';

const initialState = {
    allStores: [],
    storesFilters: [],
    storeDetail: {},
    storeProducts: [],
    storeProductsFilter: [],
    productDetail: {},
    productTypes: [],
    cart: [],
    storeCreated: {},
};

export const storeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_STORES:
            return {
                ...state,
                allStores: payload,
                storesFilters: payload
            };

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
                storeDetail: state.allStores.find((store) => {
                    return store.id === payload;
                }),
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
                productDetail: state.storeProductsFilter.find((product) => {
                    return product.id === payload;
                }),
            };

        case FILTER_PRODUCTS:
            console.log(payload)
            return {
                ...state,
                storeProductsFilter: payload,
            };

        case GET_PRODUCT_TYPES:
            return {
                ...state,
                productTypes: payload,
            };
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
            if(payload === 'A-Z'){
                let copy= state.storeProducts
                .sort((a,b)=>{
                    if (a.productName > b.productName) {
                        return 1;
                    }
                    if (b.productName > a.productName) {
                        return -1
                    }
                    return 0;
                })
                return{
                    ...state,
                    storeProductsFilter:copy
                }
            }
            if(payload === 'Z-A'){
                let copy= state.storeProducts
                .sort((a,b)=>{
                    if (a.productName > b.productName) {
                        return -1;
                    }
                    if (b.productName > a.productName) {
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    storeProductsFilter:copy
                }
            }
            if(payload === 'Price'){
                let copy= state.storeProducts
                .sort((a,b)=>{
                    if (a.price > b.price) {
                        return 1;
                    }
                    if (b.price > a.price) {
                        return -1
                    }
                    return 0;
                })
                return{
                    ...state,
                    storeProductsFilter:copy
                }
            }
            if(payload === 'Stock'){
                let copy= state.storeProducts
                .sort((a,b)=>{
                    if (a.stock > b.stock) {
                        return 1;
                    }
                    if (b.stock > a.stock) {
                        return -1
                    }
                    return 0;
                })
                return{
                    ...state,
                    storeProductsFilter:copy
                }
            }
             else {
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
