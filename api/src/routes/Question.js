const { Router } = require('express');
const router = Router();
const { getAllData, createQuestion } = require('../controllers/Question.js');

//all routes start with /question

router.get('/', getAllData);

router.post('/create', createQuestion);

module.exports = router;
