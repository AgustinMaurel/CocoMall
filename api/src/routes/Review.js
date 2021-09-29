const { Router } = require("express")
const router = Router();
const { getAllData } = require('../controllers/Review.js')


//all routes start with /review
router.get('/', getAllData)

module.exports = router