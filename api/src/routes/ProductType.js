const { Router } = require('express');
const router = Router();
const {
    getAllData,
    postBulkCreate,
    createData,
    filterTypes
} = require('../controllers/ProductType.js');

//all routes start with /productType
router.get('/', getAllData);

router.post('/filter', filterTypes)

router.post('/bulkCreate', postBulkCreate);

router.post('/create', createData);

module.exports = router;
