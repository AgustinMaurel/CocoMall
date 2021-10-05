const { Router } = require('express');
const router = Router();
const {
    getAllData,
    createProduct,
    bulkCreateProducts,
    findAllProductsOfStore,
    filterProductsByTypeAndName,
    updateDataProduct,
    deleteDataById
} = require('../controllers/Product.js');
const { route } = require('./Store.js');

//all routes start with /product

//GET's
router.get('/', getAllData);

router.get('/:id', findAllProductsOfStore);

router.get('/filter/:id', filterProductsByTypeAndName);

//POST's
router.post('/bulkCreate', bulkCreateProducts);

router.post('/create', createProduct);

//Delete Product
router.delete('/delete',deleteDataById) 

//Update Product
router.put('/update/:id',updateDataProduct) 

module.exports = router;
