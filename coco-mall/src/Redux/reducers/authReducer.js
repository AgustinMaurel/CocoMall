import { LOGIN, LOGOUT, SET_CART, SHOPPING_CART_TYPES, GET_PRODUCT } from '../actions/actionTypes';

const initialState = {
    uid: '',
    name: '',
    storeProducts: [],
    userCart: [],
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return {
                uid: payload.uid,
                name: payload.displayName,
            };
        case LOGOUT:
            return {
                uid: '',
                name: '',
            };

        case GET_PRODUCT:
            return {
                ...state,
                storeProducts: payload,
            };

        case SHOPPING_CART_TYPES.ADD_TO_CART: {
            let newItem = state.storeProducts?.find((item) => item.id === payload);
            let repeatedItem = state.userCart?.find((item) => item.id === newItem.id);

            return repeatedItem
                ? {
                      ...state,
                      cart: state.userCart.map((item) =>
                          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
                      ),
                  }
                : { ...state, cart: [...state.userCart, { ...newItem, quantity: 1 }] };
        }
        case SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.userCart.find((item) => item.id === payload);

            return itemToDelete.quantity > 1
                ? {
                      ...state,
                      cart: state.userCart.map((item) =>
                          item.id === payload ? { ...item, quantity: item.quantity - 1 } : item,
                      ),
                  }
                : { ...state, cart: state.userCart.filter((item) => item.id !== payload) };
        }

        case SHOPPING_CART_TYPES.REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                cart: state.userCart.filter((item) => item.id !== payload),
            };
        }

        case SHOPPING_CART_TYPES.CLEAR_CART: {
            return {
                ...state,
                cart: [],
            };
        }
        case SET_CART:
            return {
                ...state,
                userCart: payload,
            };

        default:
            return state;
    }
};
