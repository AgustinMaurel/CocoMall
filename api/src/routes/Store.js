const { Router } = require('express');
const router = Router();
const {
    getAllData,
    createStore,
    postBulkCreate,
    filterStoresByProductTypes,
    deleteDeep,
    updateDataStore,
    getAllProductsOfStore,
    getAllFilteredProductsOfStore
} = require('../controllers/Store.js');

//all routes start with /store
//GET's
router.get('/', getAllData);

router.get('/:id', getAllProductsOfStore);

router.post('/filter', filterStoresByProductTypes);

// router.post('/filter/:id', getAllFilteredProductsOfStore);

//POST's
router.post('/create', createStore);

router.post('/bulkCreate', postBulkCreate);

//DELETE's
router.delete('/delete/:id', deleteDeep);

//UPDATE's
router.put('/update/:id', updateDataStore);

module.exports = router;
