const { Router } = require('express');
const router = Router();
const { getAllData, createAddress, getIdData, deleteAddress } = require('../controllers/Address.js');

//all routes start with /address

// Get
router.get('/', getAllData);
router.get('/:id', getIdData)

// Post
router.post('/create', createAddress);

// Put

// Delete
router.delete('/delete/:id', deleteAddress)


module.exports = router;
