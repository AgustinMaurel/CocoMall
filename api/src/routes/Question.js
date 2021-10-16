const { Router } = require('express');
const router = Router();
const { getAllData, createQuestion, UpdateQuestion, deleteQuestion } = require('../controllers/Question.js');

//all routes start with /question

router.get('/', getAllData);

router.post('/create', createQuestion);

router.put('/update/:id', UpdateQuestion)

router.delete('/delete/:id', deleteQuestion)

module.exports = router;
