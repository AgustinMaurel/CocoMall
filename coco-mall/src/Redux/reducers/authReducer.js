import { LOGIN, LOGOUT, SHOPPING_CART_TYPES, GET_PRODUCT } from '../actions/actionTypes';

const initialState = {
    uid: '7kbFgkPbXmMUgWGP3dEk4gDMSFm2',
    name: 'Matias Monastirsky',
    storeProducts: [],
    userCart: [
        {
            id: 'd7669c4a-9666-4928-a8e9-a2ce242c4fd6',
            productName: 'Skyrim',
            price: 3500,
            stock: 10,
            sellBy: 'Cuantity',
            discount: 0,
            description: 'T.E.S 5',
            cloudImage:[ "Products/xbrogn9dkucn4dptof5j"],
            StoreId: "605ca03a-dce7-43c4-8b5b-7e1eb2b9a611",
            quantity:1
        },
        {id: '25d1cc32-b704-4353-a5a3-42aea4aecdff',
        productName: 'Gta V',
        price: 3500,
        stock: 10,
        sellBy: 'Cuantity',
        discount: 0,
        description: 'T.E.S 5',
        cloudImage:[ "Products/xbrogn9dkucn4dptof5j"],
        StoreId: "605ca03a-dce7-43c4-8b5b-7e1eb2b9a611",
        quantity:1},

        {id: '2accb88f-ff5b-4230-968b-f0bf7a2d7002',
        productName: 'Vegan Burger',
        price: 3500,
        stock: 10,
        sellBy: 'Cuantity',
        discount: 0,
        description: 'T.E.S 5',
        cloudImage:[ "Products/xbrogn9dkucn4dptof5j"],
        StoreId: "605ca03a-dce7-43c4-8b5b-7e1eb2b9a611",
        quantity:1},
        {id: '1f9ea076-adee-4f87-af97-d92f3c136af4',
        productName: 'Vegan burger',
        price: 3500,
        stock: 10,
        sellBy: 'Cuantity',
        discount: 0,
        description: 'T.E.S 5',
        cloudImage:[ "Products/xbrogn9dkucn4dptof5j"],
        StoreId: "605ca03a-dce7-43c4-8b5b-7e1eb2b9a611",
        quantity:1},
    ], // mandar este carrito al back para que quede guardado en BD
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return {
                ...state,
                uid: payload.uid,
                name: payload.displayName,

                userCart: [],
            };
        case LOGOUT:
            return {
                uid: '',
                name: '',
                storeProducts: [],
                userCart: [],
            };

        case GET_PRODUCT:
            return {
                ...state,
                storeProducts: payload,
            };

        case SHOPPING_CART_TYPES.ADD_TO_CART: {
            if (Array.isArray(state.storeProducts)) {
                var newItem = state.storeProducts?.find(
                    (item) => item.id === payload || item.idproduct === payload,
                );
            } else {
                var newItem = state.userCart?.find(
                    (item) => item.id === payload || item.idproduct === payload,
                );
            }
            let repeatedItem = state.userCart?.find(
                (item) => item.id === newItem.id || item.idproduct === payload,
            );

            return repeatedItem
                ? {
                      ...state,
                      userCart: state.userCart.map((item) =>
                          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
                      ),
                  }
                : { ...state, userCart: [...state.userCart, { ...newItem, quantity: 1 }] };
        }
        case SHOPPING_CART_TYPES.REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.userCart.find((item) => item.id === payload);

            return itemToDelete.quantity > 1
                ? {
                      ...state,
                      userCart: state.userCart.map((item) =>
                          item.id === payload ? { ...item, quantity: item.quantity - 1 } : item,
                      ),
                  }
                : { ...state, userCart: state.userCart.filter((item) => item.id !== payload) };
        }

        case SHOPPING_CART_TYPES.REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                userCart: state.userCart.filter((item) => item.id !== payload),
            };
        }

        case SHOPPING_CART_TYPES.CLEAR_CART: {
            return {
                ...state,
                userCart: [],
            };
        }
        case SHOPPING_CART_TYPES.SET_TO_CART:
            return {
                ...state,
                userCart: [...state.userCart, payload],
            };

        default:
            return state;
    }
};
