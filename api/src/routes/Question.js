const { Router } = require('express');
const router = Router();
const { getAllData, createQuestion, UpdateQuestion } = require('../controllers/Question.js');

//all routes start with /question

router.get('/', getAllData);

router.post('/create', createQuestion);

router.put('/update/:id', UpdateQuestion)

module.exports = router;
