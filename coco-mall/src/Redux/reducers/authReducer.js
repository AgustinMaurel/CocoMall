import {LOGIN, LOGOUT} from "../actions/actionTypes"

const initialState = {
    uid: 123,
    name: "Picante",
    dir: {
        b: 12
    }
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