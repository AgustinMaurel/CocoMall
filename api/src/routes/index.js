const { Router } = require('express');

const router = Router();

//se importa la ruta y se la agrega
//modelo
router.use('/', (req,res)=>{
    res.send('hola mundo')
})

module.exports = router;