const { Router } = require('express');

const router = Router();
const UserRoutes = require('./User.js')
//se importa la ruta y se la agrega
//modelo
router.use('/user', UserRoutes)

module.exports = router;