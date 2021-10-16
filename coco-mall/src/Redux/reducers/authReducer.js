import { LOGIN, LOGOUT, SHOPPING_CART_TYPES, GET_PRODUCT } from '../actions/actionTypes';

const initialState = {
    uid: '7kbFgkPbXmMUgWGP3dEk4gDMSFm2',
    name: 'Matias Monastirsky',
    storeProducts: undefined,
    userCart: [], // mandar este carrito al back para que quede guardado en BD
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return {
                ...state,
                uid: payload.uid,
                name: payload.displayName,

                userCart: [],
            };
        case LOGOUT:
            return {
                uid: '',
                name: '',
                storeProducts: [],
                userCart: [],
            };

        case GET_PRODUCT:
            return {
                ...state,
                storeProducts: payload,
            };

        case SHOPPING_CART_TYPES.ADD_TO_CART:
            console.log(payload, 'PAYLOAD');
            return {
                ...state,
                userCart: payload,
            };
        //SI ESTOY PARADO EN STORE
        //     if (Array.isArray(state.storeProducts)) {
        //         var newItem = state.storeProducts?.find(
        //             (item) => item.id === payload.id || item.idproduct === payload.id,
        //         );

        //         //SI ESTOY PARADO EN CART
        //     } else {
        //         var newItem = state.userCart?.find(
        //             (item) => item.id === payload.id || item.idproduct === payload.id,
        //         );
        //     }
        //     let repeatedItem = state.userCart?.find(
        //         (item) => item.id === newItem.id || item.idproduct === payload.id,
        //     );

        //     return repeatedItem
        //         ? {
        //               ...state,
        //               userCart: state.userCart.map((item) =>
        //                   item.id === newItem.id ? { ...item, quantity: payload.quantity } : item,
        //               ),
        //           }
        //         : { ...state, userCart: [...state.userCart, { ...newItem, quantity: 1 }] };
        // }

        case SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART:
            // let itemToDelete = state.userCart.find((item) => item.id === payload.id);

            // return itemToDelete.quantity > 1
            //     ? {
            //           ...state,
            //           userCart: state.userCart.map((item) =>
            //               item.id === payload.id ? { ...item, quantity: payload.quantity } : item,
            //           ),
            //       }
            //     : { ...state, userCart: state.userCart.filter((item) => item.id !== payload.id) };
            return {
                ...state,
                userCart: payload,
            };

        case SHOPPING_CART_TYPES.REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                userCart: state.userCart.filter((item) => item.id !== payload),
            };
        }

        case SHOPPING_CART_TYPES.CLEAR_CART: {
            return {
                ...state,
                userCart: [],
            };
        }
        case SHOPPING_CART_TYPES.SET_TO_CART:
            return {
                ...state,
                userCart: payload,
            };

        default:
            return state;
    }
};
