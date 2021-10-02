const { Router } = require("express")
const router = Router();
const { getAllData, createProduct, bulkCreateProducts, findAllProductsOfStore, filterProductsByType } = require('../controllers/Product.js')


//all routes start with /product

//GET's
router.get('/', getAllData)

router.get('/:id', findAllProductsOfStore)

router.get('/filter/:id', filterProductsByType)

//POST's
router.post('/bulkCreate', bulkCreateProducts)

router.post('/create', createProduct)


module.exports = router