const { SubCategory } = require('../models/index');
const ModelController = require('./index');
const { Op } = require('sequelize');

class SubCategoryModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    filterSubCategories = (req, res) => {
        const { allSub } = req.body
        if(allSub){
            try {
                const allSubCategories = this.model.findAll({
                    where: {
                        id: {
                            [Op.or]: allSub
                        }
                    }
                })
                res.send(allSubCategories)
            } catch (error) {
                res.send(error)
            }
        } else {
            res.send("Wrong parameters")
        }
    }
}

const SubCategoryController = new SubCategoryModel(SubCategory);

module.exports = SubCategoryController;