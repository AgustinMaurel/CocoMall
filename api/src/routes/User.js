const { Router } = require('express');
const router = Router();
const {
    getAllData,
    createUser,
    bulkCreateUser,
    getUserById,
    updateData
} = require('../controllers/User.js');

//all routes start with /user

//GET's
router.get('/', getAllData);

router.get('/:id', getUserById);

//POST's
router.post('/create', createUser);

router.post('/bulkCreate', bulkCreateUser);

//
router.put('/update/:id',updateData);

module.exports = router;
