const { Router } = require('express');
const router = Router();
const { getAllData, createReview, updateReview, deleteReview } = require('../controllers/Review.js');

//all routes start with /review
router.get('/', getAllData);

router.post('/create', createReview);

router.put('/update/:id', updateReview)

router.delete('/delete/:id', deleteReview)


module.exports = router;
