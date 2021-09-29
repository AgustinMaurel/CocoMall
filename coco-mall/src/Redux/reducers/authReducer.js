import {LOGIN, LOGOUT} from "../actions/actionTypes"

const initialState = {
    uid: 0,
    name: "",
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case LOGOUT:
            return {

            }
        default:
            return state;
    }

}