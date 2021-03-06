const { Router } = require('express');
const router = Router();
const { getAllData, createReview , updateReview, getStoreReview} = require('../controllers/Review.js');

//all routes start with /review
router.get('/', getAllData);

router.get('/:id', getStoreReview)

router.post('/create', createReview);

router.put('/update/:id', updateReview)

// Delete? No, no queremos que se borren las reviews por ahora.

module.exports = router;
