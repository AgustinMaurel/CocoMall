const { Router } = require("express")
const router = Router();
const { findData } = require('../controllers/Order.js')


//all func start with /order
router.get('/', findData)

module.exports = router