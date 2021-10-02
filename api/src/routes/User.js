const { Router } = require('express');
const router = Router();
const { getAllData, createUser, bulkCreateUser } = require('../controllers/User.js');

//all routes start with /user
router.get('/', getAllData);
router.post('/create', createUser);
router.post('/bulkCreate', bulkCreateUser)
module.exports = router;
