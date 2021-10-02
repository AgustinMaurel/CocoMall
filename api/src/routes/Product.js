const { Router } = require("express")
const router = Router();
const { getAllData, createProduct, bulkCreateProducts } = require('../controllers/Product.js')


//all routes start with /product
router.get('/', getAllData)

router.post('/create', createProduct)

router.post('/bulkCreate', bulkCreateProducts)

module.exports = router