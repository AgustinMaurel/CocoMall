const { Router } = require("express")
const router = Router();
const { getAllData } = require('../controllers/ProductType.js')


//all func start with /productType
router.get('/', getAllData)

module.exports = router