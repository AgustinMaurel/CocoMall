const { Router } = require("express")
const router = Router();
const { findData } = require('../controllers/Review.js')


//all func start with /review
router.get('/', findData)

module.exports = router