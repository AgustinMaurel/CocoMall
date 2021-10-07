const { Router } = require('express');
const router = Router();
const {
  getAllData,
  createStore,
  postBulkCreate,
  filterStoresByProductTypes,
  deleteDeep,
  updateDataStore,
} = require('../controllers/Store.js');

//all routes start with /store
//GET's
router.get('/', getAllData);

router.get('/filter', filterStoresByProductTypes);

//POST's
router.post('/create', createStore);

router.post('/bulkCreate', postBulkCreate);
//delete store
router.delete('/delete/:id', deleteDeep);
//update store
router.put('/update/:id', updateDataStore);
module.exports = router;
