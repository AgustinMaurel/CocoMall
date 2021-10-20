const { Router } = require('express');
const router = Router();
const { getAllData, createQuestion, updateQuestion , deleteQuestion, getQuestionByProduct} = require('../controllers/Question.js');

//all routes start with /question

router.get('/', getAllData);

router.get('/:id', getQuestionByProduct);

router.post('/create', createQuestion);

router.put('/update', updateQuestion)

router.delete('/delete/:id', deleteQuestion)

module.exports = router;