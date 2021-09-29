const { Router } = require("express")
const router = Router();
const { getAllData, createStore } = require('../controllers/Store.js')

//all routes start with /store
router.get('/', getAllData)

router.post('/create', createStore)

module.exports = router