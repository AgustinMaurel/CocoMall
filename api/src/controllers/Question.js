const { Question, Product } = require('../models/index');
const ModelController = require('./index');

class QuestionModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createQuestion = async (req, res) => {
        if (req.body.id) {
            try {
                //id of Product
                const id = req.body.id
                const question = {
                    question: req.body.question,
                };
                //Create the review
                const newQuestion = await this.model.create(question);
                const questionId = newQuestion.id;
                //Search the order and attach the Review
                const product = await Product.findByPk(id);
                await product.addReview(questionId);
                //final question
                const finalQuestion = await this.model.findByPk(questionId)
                res.send(finalQuestion);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };
    UpdateQuestion= async (req,res)=>{
         if(req.body.id){
            try{
                const finalQuestion=this.model.update({answer:req.body.answer},{where:{
                    id:req.body.id
                }})
            }catch(e){
                res.send(`error producido:${e}`)
            }
         }else{
             res.send("error falta de argumentos")
         }
    }


}

const QuestionController = new QuestionModel(Question);

module.exports = QuestionController;