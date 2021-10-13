const { Router } = require('express');
const router = Router();
const { getAllData, createOrder,allOrderStore } = require('../controllers/Order.js');

//all routes start with /order
router.get('/', getAllData);
router.get('/:StoreId',allOrderStore)
router.post('/create', createOrder);
module.exports = router;
