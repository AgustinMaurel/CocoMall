const { Router } = require("express")
const router = Router();
const { getAllData } = require('../controllers/Order.js')


//all func start with /order
router.get('/', getAllData)

module.exports = router