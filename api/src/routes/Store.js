const { Router } = require('express');
const router = Router();
const {
    getAllData,
    createStore,
    postBulkCreate,
    filterStoresByProductTypes,
    deleteDeep
} = require('../controllers/Store.js');

//all routes start with /store
//GET's
router.get('/', getAllData);

router.get('/filter', filterStoresByProductTypes);

//POST's
router.post('/create', createStore);

router.post('/bulkCreate', postBulkCreate);

router.delete('/delete/:id',deleteDeep)
module.exports = router;
