const { Router } = require("express")
const router = Router();
const { getAllData } = require('../controllers/Address.js')


//all routes start with /adress
router.get('/', getAllData)

module.exports = router