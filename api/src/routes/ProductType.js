const { Router } = require("express")
const router = Router();
const { getAllData, postBulkCreate} = require('../controllers/ProductType.js')


//all routes start with /productType
router.get('/', getAllData)

router.post('/bulkCreate', postBulkCreate)

module.exports = router