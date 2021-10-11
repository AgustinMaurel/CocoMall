import { LOGIN, LOGOUT , SET_CART} from '../actions/actionTypes';

const initialState = {
    uid: '',
    name: '',
    userCart: undefined
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
            };
        case LOGOUT:
            return {
                uid: '',
                name: '',
            };

        case SET_CART: 
            return {
                ...state,
                userCart: action.payload
            }

        default:
            return state;
    }
};
