const { Router } = require("express")
const router = Router();
const { getAllData, createStore,postBulkCreate} = require('../controllers/Store.js')

//all routes start with /store
router.get('/', getAllData)

router.post('/create', createStore)

router.post('/bulkCreate', postBulkCreate)

module.exports = router