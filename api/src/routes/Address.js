const { Router } = require("express")
const router = Router();
const { findData } = require('../controllers/Address.js')


//all func start with /adress
router.get('/', findData)

module.exports = router