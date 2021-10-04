import { GET_STORES } from "../actions/actionTypes"

const initialState = {
    allStores: []
}

export const storeReducer = (state = initialState, {type, payload}) => {
    if(type === GET_STORES ){
        return {
            ...state,
            allStores : payload
        }
       
    }
    return state
}