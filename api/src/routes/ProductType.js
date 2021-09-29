const { Router } = require("express")
const router = Router();
const { findData } = require('../controllers/ProductType.js')


//all func start with /productType
router.get('/', findData)

module.exports = router