const { Router } = require('express');
const router = Router();
const {
    getAllData,
    filterSubCategories,
    getSubCategoriesFiltered
} = require('../controllers/SubCategory');

//all routes start with /subCategory
router.get('/', getAllData);

router.get('/match/', getSubCategoriesFiltered);

router.get('/match/:word', getSubCategoriesFiltered);

router.post('/filter', filterSubCategories)

module.exports = router;