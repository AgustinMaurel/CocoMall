const { Router } = require('express');
const router = Router();
const  {getStoreImages , getProductImages}  = require('../controllers/Images.js');

//all routes start with /adress
router.get('/store', getStoreImages);
router.get('/product', getProductImages);

module.exports = router;
