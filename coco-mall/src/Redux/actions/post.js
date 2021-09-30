import axios from 'axios'
import {POST_STORE} from './actionTypes'

export const postStore = (shop) => {
    return async function(dispatch) {
        const newShop = await axios.post( 'localhost3001.com/',shop)
    }
}