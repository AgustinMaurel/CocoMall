const { Router } = require("express")
const router = Router();
const { getAllData, createStore,postBulkCreate,getFilter} = require('../controllers/Store.js')

//all routes start with /store
router.get('/', getAllData)

 router .get('/filter',getFilter)

router.post('/create', createStore)

router.post('/bulkCreate', postBulkCreate)

module.exports = router