import { GET_STORES } from "./actionTypes";
import { STORES_URL } from "../../Scripts/constants";
import axios from 'axios'

export const getStores = () => {
    return async (dispatch) => {
        const response = await axios.get(STORES_URL)
        dispatch({type: GET_STORES, payload: response.data })       
    }
}