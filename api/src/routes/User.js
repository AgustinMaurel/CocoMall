const { Router } = require('express');
const router = Router();
const { getAllData, createUser ,getFindId} = require('../controllers/User.js');

//all routes start with /user
router.get('/', getAllData);
router.post('/create', createUser);
router.get('/validate',getFindId)


module.exports = router;
