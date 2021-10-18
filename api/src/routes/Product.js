const { Router } = require('express');
const router = Router();
const {
    getAllData,
    createProduct,
    bulkCreateProducts,
    findAllProductsOfStore,
    updateDataProduct,
    deleteDataById,
    deleteProduct,
    filterProductsByStore,
    getOneProductById
} = require('../controllers/Product.js');

//all routes start with /product

//GET's
router.get('/', getAllData);

router.get('/find/:id', getOneProductById)

router.get('/:id', findAllProductsOfStore);

router.post('/filter/:id', filterProductsByStore); //este es pra obtener datos filtrados en realidad no para crear

//POST's
router.post('/bulkCreate', bulkCreateProducts);

router.post('/create', createProduct);

//Delete Product
router.delete('/delete/:id', deleteProduct);

//Update Product
router.put('/update/:id', updateDataProduct);

module.exports = router;
