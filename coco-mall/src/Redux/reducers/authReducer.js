import { LOGIN, LOGOUT } from '../actions/actionTypes';

const initialState = {
    uid: '',
    name: '',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            // console.log(action.payload);
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
            };
        case LOGOUT:
            return {
                uid: '',
                name: '',
            };

        default:
            return state;
    }
};
