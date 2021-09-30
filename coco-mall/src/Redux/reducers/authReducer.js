import { LOGIN, LOGOUT, FIREBASE_ERR } from '../actions/actionTypes';

const initialState = {
    uid: 0,
    name: '',
    err: '',
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
                uid: 0,
                name: '',
                err: '',
            };
        case FIREBASE_ERR:
            if (action.payload === 'auth/email-already-in-use'){
                return {
                    ...state,
                    err: 'The email is already in use',
                };
            }
            if(action.payload === 'auth/user-not-found'){
                return {
                    ...state,
                    err: 'The user is not found'
                }
            }
            if(action.payload === 'auth/wrong-password'){
                return {
                    ...state,
                    err: 'The password is wrong'
                }
            }
        default:
            return state;
    }
};
