const { Router } = require('express');
const router = Router();
const  getAllImages  = require('../controllers/Images.js');

//all routes start with /adress
router.get('/', getAllImages);

module.exports = router;
