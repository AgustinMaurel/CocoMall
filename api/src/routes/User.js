const { Router } = require("express")
const router = Router();
const { getAllUsers } = require('../controllers/User.js')


//all func start with /user
router.get('/', getAllUsers)

module.exports = router