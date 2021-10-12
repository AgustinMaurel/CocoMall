const { Router } = require('express');
const router = Router();
const { getAllData, createOrder } = require('../controllers/Order.js');

//all routes start with /order
router.get('/', getAllData);
router.post('/create', createOrder);
module.exports = router;
