const { Router } = require('express');
const router = Router();
const { getAllData, createAddress, getIdData } = require('../controllers/Address.js');

//all routes start with /address
router.get('/', getAllData);
router.get('/:id', getIdData)
router.post('/create', createAddress);
module.exports = router;
