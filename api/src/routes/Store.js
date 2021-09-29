const { Router } = require("express")
const router = Router();
const { getAllData } = require('../controllers/Store.js')


//all func start with /store
router.get('/', getAllData)

module.exports = router