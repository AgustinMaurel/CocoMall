export const PRODUCT_CREATE_URL = 'http://localhost:3001/product/create';
export const STORE_CREATE_URL = 'http://localhost:3001/store/create';
export const STORES_URL = 'http://localhost:3001/store';
export const SEARCH_URL = `${STORES_URL}/filter`;

export const BASE_URL = 'http://localhost:3001';
export const PRODUCT_URL = 'http://localhost:3001/product/create';
export const IMG_DEFAULT =
    'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png';
export const LOGO_DEFAULT = 'https://cireasesores.com/wp-content/uploads/2017/01/default_logo.png';
export const BANNER_DEFAULT =
    'https://img.freepik.com/vector-gratis/personas-pie-cola-tienda_23-2148594615.jpg?size=626&ext=jpg';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyBFiLTvogLQJxloGNs-gSm6f9kL4NKot_U';

/*------------- SHOPPING CART ----------------*/

export const SHOPPING_CART_BASE = `${BASE_URL}/cart`;

export const SHOPPING_CART = {
    GET_PRODUCTS: `${SHOPPING_CART_BASE}/getProduct`,
    ADD_TO_CART: `${SHOPPING_CART_BASE}/addToCart`,
    REMOVE_FROM_CART: `${SHOPPING_CART_BASE}/deleteFromCart`,
    CLEAR_CART: `${SHOPPING_CART_BASE}/clearCart`,
};


export const DELETE_PRODUCT = 'http://localhost:3001/product/delete'

export const CREATE_USER_URL = 'http://localhost:3001/user/create';


export const UPDATE_PRODUCT = 'http://localhost:3001/product/update'
