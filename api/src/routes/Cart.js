const { Router } = require('express');

const router = Router();

//imports of Routes
const {
 addToCart,
 deleteFromCart,
 clearCart,
 getProducto
} = require('../controllers/Cart.js');

//se importa la ruta y se la agrega
//modelo
router.get('/getProduct',getProducto)
router.post('/addToCart',addToCart);
router.post('/deleteFromCart',deleteFromCart)
router.post('/clearCart',clearCart)

module.exports = router;
