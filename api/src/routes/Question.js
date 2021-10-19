const { Router } = require('express');
const router = Router();
const { getAllData, createQuestion, updateQuestion , deleteQuestion} = require('../controllers/Question.js');

//all routes start with /question

router.get('/', getAllData);

router.post('/create', createQuestion);

router.put('/update', updateQuestion)

router.delete('/delete/:id', deleteQuestion)

module.exports = router;