const { Router } = require('express');
const router = Router();
const { getAllData, createOrder, deleteOrder} = require('../controllers/Order.js');

//all routes start with /order
//GET's
router.get('/', getAllData);

//POST's
router.post('/create', createOrder);

//DELETE's
router.delete('/delete/:id', deleteOrder)

module.exports = router;
