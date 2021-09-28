const { Router } = require('express');

const router = Router();

//se importa la ruta y se la agrega
//modelo
router.use('/', 'Ruta')

module.exports = router;