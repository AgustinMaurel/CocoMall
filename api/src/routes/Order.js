const { Router } = require('express');
const router = Router();
const { getAllData, createOrder, deleteOrder, findOrderId} = require('../controllers/Order.js');

//all routes start with /order
//GET's
router.get('/', getAllData);
router.get('/:id', findOrderId)

//POST's
router.post('/create', createOrder);

//DELETE's
router.delete('/delete/:id', deleteOrder)

module.exports = router;
