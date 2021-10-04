import { GET_STORES, SEARCH_BY_NAME } from "../actions/actionTypes"

const initialState = {
    allStores: [],
    storesByName : {}
}

export const storeReducer = (state = initialState, {type, payload}) => {
    if(type === GET_STORES ){
        return {
            ...state,
            allStores : payload
        }       
    }

    if(type === SEARCH_BY_NAME){
        return{
            ...state,
            storesByName: payload
        }
    }
    return state
}