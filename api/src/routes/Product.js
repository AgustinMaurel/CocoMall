const { Router } = require("express")
const router = Router();
const { findData } = require('../controllers/Product.js')


//all func start with /product
router.get('/', findData)

module.exports = router