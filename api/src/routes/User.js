const { Router } = require('express');
const router = Router();
const {
    getAllData,
    createUser,
    bulkCreateUser,
    getUserById,
    updateData,
    updateCart,
} = require('../controllers/User.js');

//all routes start with /user

//GET's
router.get('/', getAllData);

router.get('/:id', getUserById);

//POST's
router.post('/create', createUser);

router.post('/bulkCreate', bulkCreateUser);

//PUT's
router.put('/update/:id', updateData);

router.post('/update/cart', updateCart); // body id usuario , y cart:[{idProduct, cantidad}]

module.exports = router;
