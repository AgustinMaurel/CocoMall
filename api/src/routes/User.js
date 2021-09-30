const { Router } = require('express');
const router = Router();
const { getAllData, createUser } = require('../controllers/User.js');

//all routes start with /user
router.get('/', getAllData);
router.post('/create', createUser);

module.exports = router;