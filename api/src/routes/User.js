const { Router } = require("express")
const router = Router();
const { getAllData } = require('../controllers/User.js')


//all func start with /user
router.get('/', getAllData)

module.exports = router