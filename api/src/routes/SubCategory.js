const { Router } = require('express');
const router = Router();
const {
    getAllData,
} = require('../controllers/SubCategory');

//all routes start with /subCategory
router.get('/', getAllData);

module.exports = router;