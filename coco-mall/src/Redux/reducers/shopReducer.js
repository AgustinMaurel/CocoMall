import { GET_STORES, SEARCH_BY_NAME, SEARCH_BY_ID, GET_PRODUCT } from "../actions/actionTypes"

const initialState = {
    allStores: [],
    storesByName : {},
    storeDetail: {},
    storeProducts: []
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

    if(type === GET_PRODUCT){
        return {
            ...state,
            storeProducts: payload
        }
    }
    return state
}