import axios from 'axios';
import { SHOPPING_CART } from './constants';

/* export function getProducts(user) {
    axios.post(SHOPPING_CART.GET_PRODUCTS, user).then(res => res.data)
} */

export function addToCart(product) {
    axios
        .post(SHOPPING_CART.ADD_TO_CART, product)
        .then((res) => res.data)
        .catch((err) => console.error(err));
}
