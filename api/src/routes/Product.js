const { Router } = require("express")
const router = Router();
const { getAllData } = require('../controllers/Product.js')


//all func start with /product
router.get('/', getAllData)

module.exports = router