const { Router } = require("express")
const router = Router();
const { getAllData,createProduct} = require('../controllers/Product.js')


//all routes start with /product
router.get('/', getAllData)
router.post('/',createProduct)

module.exports = router