// import { GET_STORES, SEARCH_BY_NAME, SEARCH_BY_ID, GET_PRODUCT, ADD_ITEMS_TO_CART } from '../actions/actionTypes';

// const initialState = {
//     allStores: [],
    
//     storeDetail: {},
//     storeProducts: [],
//     itemsInCart: 0
// };

// export const storeReducer = (state = initialState, { type, payload }) => {
//     switch (type) {
//         case GET_STORES:
//             return {
//                 ...state,
//                 allStores: payload,
//             };

//         case SEARCH_BY_NAME:
//             return {
//                 ...state,
//                 storesByName: payload,
//             };

//         case SEARCH_BY_ID:
//             return {
//                 ...state,
//                 storeDetail: state.allStores.find((store) => {
//                     return store.id === payload;
//                 }),
//             };

//         case GET_PRODUCT:
//             return {
//                 ...state,
//                 storeProducts: payload,
//             };

//         case ADD_ITEMS_TO_CART:
//             return {
//                 ...state,
//                 itemsInCart: state.itemsInCart + payload
//             }

//         default:
//             return state;
//     }
// };





import { GET_STORES, SEARCH_BY_NAME, SEARCH_BY_ID, GET_PRODUCT , SHOPPING_CART_TYPES } from '../actions/actionTypes';

const initialState = {
    allStores: [],
    storesByName: {},
    storeDetail: {},
    storeProducts: [],
    cart: [],
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
                cart: []
            };
        }

        default:
            return state;
    }
};