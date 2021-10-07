const { Router } = require('express');
const router = Router();
const { getAllData } = require('../controllers/Question.js');

//all routes start with /question

router.get('/', getAllData);

router.get('/create', () => { });

module.exports = router;