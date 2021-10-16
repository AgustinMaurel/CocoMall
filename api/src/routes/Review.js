const { Router } = require('express');
const router = Router();
const { getAllData, createReview } = require('../controllers/Review.js');

//all routes start with /review
router.get('/', getAllData);

router.post('/create', createReview);


module.exports = router;
