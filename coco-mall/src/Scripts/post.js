import axios from 'axios';
import { PRODUCT_URL } from './constants';

//create product data
export function postProduct(payload) {
    return () => {
      axios
        .post(`${PRODUCT_URL}`, payload)
        .then((res) => res.data)
        .then((product) => {
          return product;
        })
        .catch((error) => console.log(error));
    };
}
