const { Question, Product, User } = require('../models/index');
const { Op } = require('sequelize');
const ModelController = require('./index');

class QuestionModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createQuestion = async (req, res) => {
        const { productId, userId, bodyQuestion } = req.body
        if (productId) {
            try {
                const question = {
                    question: bodyQuestion,
                };
                //Create the Question
                const newQuestion = await this.model.create(question);
                const questionId = newQuestion.id;
                // //Search the product and attach the Question
                const product = await Product.findByPk(productId);
                await product.addQuestion(questionId);
                // //Search the User and attach the Question
                const user = await User.findByPk(userId)
                await user.addQuestion(questionId)
                // //Final Question
                const finalQuestion = await this.model.findByPk(questionId);
                res.send(finalQuestion);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    updateQuestion = async (req, res) => {
        const { id, answer } = req.body
        if (id) {
            try {
                const finalQuestion = await this.model.update(
                    { answer: answer },
                    {
                        where: {
                            id: id
                        },
                    }
                );
                res.send("Question updated successfully")
            } catch (e) {
                res.send(e);
            }
        } else {
            res.send('No id provided');
        }
    };

    deleteQuestion = async (req, res) => {
        const { id } = req.params;
        if (id) {
            try {
                const deleted = await this.model.destroy({ where: { id: id } });
                if (deleted === 1) {
                    res.send('Question deleted');
                } else {
                    res.send('Oops, something went wrong');
                }
            } catch (e) {
                res.send(e);
            }
        } else {
            res.json({ error: 'No id in params' });
        }
    };

    getQuestionByProduct = async (req, res) => {
        const id = req.params.id
        if (id) {
            try {
                const questions = await this.model.findAll({
                    where: {
                        ProductId: id
                    },
                    include: [
                        {
                            model: User,
                            attributes: ["Name"]
                        }
                    ]
                })
                res.send(questions)
            } catch (error) {
                res.send(error)
            }
        } else {
            res.send("Wrong params")
        }
    }

    getQuestionToResponse = async (req, res) => {
        //id de la tienda
        const id = req.params.id
        if (id) {
            try {
                const stores = await Product.findAll({
                    where: {
                        StoreId: id
                    }
                })
                let productIds = []
                for (const store of stores) {
                    productIds = [...productIds, store.dataValues.id]
                }
                const questions = await this.model.findAll({
                    where: {
                        ProductId: {
                            [Op.or]: productIds
                        },
                        answer: "null"
                    },
                    include: [
                        {
                            model: User,
                            attributes: ["Name"]
                        },
                        {
                            model: Product,
                            attributes: ["productName", "cloudImage"]
                        }
                    ]
                })
                res.send(questions)
            } catch (error) {
                res.send(error)
            }
        } else {
            res.send("Wrong params")
        }
    }
}

const QuestionController = new QuestionModel(Question);

module.exports = QuestionController;