const { Router } = require('express');

const router = Router();

//imports of Routes
const AddressRoutes = require('./Address.js');
const OrderRoutes = require('./Order.js');
const ProductRoutes = require('./Product.js');
const ProductTypeRoutes = require('./ProductType.js');
const ReviewRoutes = require('./Review.js');
const StoreRoutes = require('./Store.js');
const UserRoutes = require('./User.js');
const CheckOutRoutes = require('./Checkout.js');
const ImagesRoutes = require('./Images.js');

//se importa la ruta y se la agrega
//modelo
router.use('/address', AddressRoutes);
router.use('/order', OrderRoutes);
router.use('/product', ProductRoutes);
router.use('/productType', ProductTypeRoutes);
router.use('/review', ReviewRoutes);
router.use('/store', StoreRoutes);
router.use('/user', UserRoutes);
router.use('/checkout', CheckOutRoutes);
router.use('/images', ImagesRoutes);

module.exports = router;
