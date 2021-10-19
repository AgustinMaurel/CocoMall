const { SubCategory } = require('../models/index');
const ModelController = require('./index');
const { Op } = require('sequelize');

class SubCategoryModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    filterSubCategories = async (req, res) => {
        const { allSub } = req.body
        if (allSub) {
            try {
                const allSubCategories = await this.model.findAll({
                    where: {
                        id: {
                            [Op.or]: allSub
                        }
                    },
                })
                res.send(allSubCategories)
            } catch (error) {
                res.send(error)
            }
        } else {
            res.send("Wrong parameters")
        }
    }

    getSubCategoriesFiltered = async (req, res) => {
        const word  = req.params.word
        if (word) {
            try {
                const filteredSubCat = await this.model.findAll({
                    where: {
                        Name: {
                            [Op.iLike]: `%${word}%`
                        }
                    },
                    limit: 3
                })
                res.send(filteredSubCat)
            } catch (error) {
                res.send(error)
            }
        } else {
            res.status(400).send('Wrond params')
        }
    }
}

const SubCategoryController = new SubCategoryModel(SubCategory);

module.exports = SubCategoryController;