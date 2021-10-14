const { Router } = require('express');
const router = Router();
const {
    getAllData,
    filterSubCategories
} = require('../controllers/SubCategory');

//all routes start with /subCategory
router.get('/', getAllData);

router.post('/filtered', filterSubCategories)

module.exports = router;