const { Router } = require('express');
const router = Router();
const {
    getAllData,
    createUser,
    bulkCreateUser,
    getUserById,
    updateData,
    updateCart,
    deleteUser,
    activateUser
} = require('../controllers/User.js');
const { validation } = require('../utils/middlewares/validation')
//all routes start with /user

//GET's
router.get('/', getAllData);

router.get('/:id', validation, getUserById);

//POST's
router.post('/create', createUser);

router.post('/bulkCreate', bulkCreateUser);

//PUT's
router.put('/update/:id', updateData);

router.post('/update/cart', updateCart); // body id usuario , y cart:[{id, cantidad}]

//DELETE's
router.delete('/delete/:id', deleteUser)

router.put('/active/:id', activateUser)

module.exports = router;
