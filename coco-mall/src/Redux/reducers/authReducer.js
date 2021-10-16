import { LOGIN, LOGOUT, SHOPPING_CART_TYPES, GET_PRODUCT, USER_INFO } from '../actions/actionTypes';

const initialState = {
    uid: '',
    name: '',
    state: '',
    country: '',
    storeProducts: [],
    userCart: [], // mandar este carrito al back para que quede guardado en BD
    userInfoDB: []
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return {
                ...state,
                uid: payload.uid,
                name: payload.displayName,
                state: payload.state,
                country: payload.country,

                userCart: [],
            };
        case LOGOUT:
            return {
                uid: '',
                name: '',
                storeProducts: [],
                userCart: [],
                userInfoDB: []
            };

        case GET_PRODUCT:
            return {
                ...state,
                storeProducts: payload,
            };
        
        case USER_INFO: 
        return {
            ...state,
            userInfoDB: payload
        }

        case SHOPPING_CART_TYPES.ADD_TO_CART: {
            let newItem = state.storeProducts?.find(
                (item) => item.id === payload || item.idproduct === payload,
            );
            let repeatedItem = state.userCart?.find(
                (item) => item.id === newItem.id || item.idproduct === payload,
            );

            return repeatedItem
                ? {
                      ...state,
                      userCart: state.userCart.map((item) =>
                          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
                      ),
                  }
                : { ...state, userCart: [...state.userCart, { ...newItem, quantity: 1 }] };
        }
        case SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.userCart.find((item) => item.id === payload);

            return itemToDelete.quantity > 1
                ? {
                      ...state,
                      userCart: state.userCart.map((item) =>
                          item.id === payload ? { ...item, quantity: item.quantity - 1 } : item,
                      ),
                  }
                : { ...state, userCart: state.userCart.filter((item) => item.id !== payload) };
        }

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
                userCart: [...state.userCart, payload],
            };

        default:
            return state;
    }
};
