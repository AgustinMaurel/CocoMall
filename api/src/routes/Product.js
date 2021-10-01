const { Router } = require("express")
const router = Router();
const { getAllData,createProduct} = require('../controllers/Product.js')


//all routes start with /product
router.get('/', getAllData)

router.post('/create',createProduct)

module.exports = router