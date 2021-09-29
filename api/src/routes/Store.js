const { Router } = require("express")
const router = Router();
const { findData } = require('../controllers/Store.js')


//all func start with /store
router.get('/', findData)

module.exports = router