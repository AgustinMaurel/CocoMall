const { Router } = require("express")
const router = Router();
const { getAllData } = require('../controllers/ProductType.js')


//all routes start with /productType
router.get('/', getAllData)

module.exports = router