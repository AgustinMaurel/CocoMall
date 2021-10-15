const { Question, Product, User} = require('../models/index');
const ModelController = require('./index');

class QuestionModel extends ModelController {
  constructor(model) {
    super(model);
  }
  //Specific Functions for this model
  createQuestion = async (req, res) => {
    //id of Product
    const { productId } = req.body;
    if (productId) { 
      try {
        // Id of the user
        const {userId} = req.body
        // Object question
        const { question } = req.body;
        // Object for create
        const obj = {
          question: req.body.question,
          answer: 'null',
        };
        if (question) {
          let aux = '';
          //Create the Question
          const newQuestion = await this.model.create(obj);
          aux = newQuestion.id;
          //Search the Product and attach the question
          const product = await Product.findByPk(productId);
          await product.addQuestion(aux);
          //Search the User and attach the question
          const user = await User.findByPk(userId)
          await user.addQuestion(aux)

          //final Question
          const finalQuestion = await this.model.findByPk(aux);
          return res.send(finalQuestion);
        } else {
          return res.send('Oops, something went wrong');
        }
      } catch (e) {
        res.send(e);
      }
    } else {
      res.status(400).send({ message: 'Wrong parameters' });
    }
  };
  UpdateQuestion = async (req, res) => {
    // Question Id
    const { id } = req.params;
    if (id) {
      try {
        // Se puede usar para modificar la question del user tambien, se manda en answer por body y en la linea 48 se pone 'question' en vez de 'answer'
        const finalQuestion = this.model.update(
          { answer: req.body.answer },
          { where: { id: id } }
        );
        res.send("Answer added successfully")
      } catch (e) {
        res.send(e);
      }
    } else {
      res.send('No Question ID provided via params');
    }
  };
  deleteQuestion = async (req, res) => {
    // Question Id
    const { id } = req.params
    if(id){
      const deletedQuestion = await this.model.destroy({where: {id: id}})
      if(deletedQuestion===1){
        res.send("Question deleted")
      }else{
        res.send("Oops, something went wrong")
      }
    }else{
      res.send("No id via params")  
    }
  }
}

const QuestionController = new QuestionModel(Question);

module.exports = QuestionController;
