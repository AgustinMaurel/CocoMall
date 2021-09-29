const { Router } = require("express")
const router = Router();
const { getAllData, createStore } = require('../controllers/Store.js')



// creacion de tienda
// busco el Usuario por id, y cuando lo encuentre le hago un .addStore(..) ".." le paso el objeto para la creacion de la tienda

//all func start with /store
router.get('/', getAllData)

router.post('/create', createStore)

module.exports = router