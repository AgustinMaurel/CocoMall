const { Router } = require('express');

const router = Router();

//imports of Routes
const {
    addToCart,
    deleteFromCart,
    clearCart,
    getCart
} = require('../controllers/Cart.js');

//se importa la ruta y se la agrega
//modelo

router.post('/getProduct', getCart)

router.post('/addToCart', addToCart);

router.post('/deleteFromCart', deleteFromCart)

router.post('/clearCart', clearCart)

module.exports = router;
