const { Router } = require("express")
const router = Router();
const { getAllData, createProduct, bulkCreateProducts, findAllProductsOfStore, filterProductsByTypeAndName } = require('../controllers/Product.js')


//all routes start with /product

//GET's
router.get('/', getAllData)

router.get('/:id', findAllProductsOfStore)

router.get('/filter/:id', filterProductsByTypeAndName)

//POST's
router.post('/bulkCreate', bulkCreateProducts)

router.post('/create', createProduct)


module.exports = router