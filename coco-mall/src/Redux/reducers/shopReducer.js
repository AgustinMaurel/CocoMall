import { GET_STORES, SEARCH_BY_NAME, SEARCH_BY_ID } from "../actions/actionTypes"

const initialState = {
    allStores: [],
    storesByName : {},
    storeDetail: {}
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

    if(type === SEARCH_BY_ID){
        return {
            ...state,
            storeDetail: state.allStores.find((store) => {
                return store.id === payload 
            })
        }
    }
    return state
}