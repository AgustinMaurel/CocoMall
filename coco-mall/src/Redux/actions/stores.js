import { GET_STORES , SEARCH_BY_NAME } from "./actionTypes";
import { STORES_URL , SEARCH_URL } from "../../Scripts/constants";
import axios from 'axios'

export const getStores = () => {
    return async (dispatch) => {
        const response = await axios.get(STORES_URL)
        dispatch({type: GET_STORES, payload: response.data })       
    }
}
 
export const getStoresByName = () => {
    return async (dispatch) => {
        const response = await axios.get(SEARCH_URL);
        dispatch({type: SEARCH_BY_NAME , payload: response.data})
    }
}

