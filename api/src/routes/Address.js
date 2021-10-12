const { Router } = require('express');
const router = Router();
const { getAllData, createAddress } = require('../controllers/Address.js');

//all routes start with /address
router.get('/', getAllData);
router.post('/create', createAddress);
module.exports = router;
