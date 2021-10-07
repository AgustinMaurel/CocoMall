const { Router } = require('express');
const router = Router();
const {
    getAllData,
    createStore,
    postBulkCreate,
    filterStoresByProductTypes,
    findStoresOfUser,
} = require('../controllers/Store.js');

//all routes start with /store
//GET's
router.get('/', getAllData);

router.get('/filter', filterStoresByProductTypes);

router.get('/user', findStoresOfUser)

//POST's
router.post('/create', createStore);

router.post('/bulkCreate', postBulkCreate);

module.exports = router;
