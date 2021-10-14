const { SubCategory } = require('../models/index');
const ModelController = require('./index');

class SubCategoryModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const SubCategoryController = new SubCategoryModel(SubCategory);

module.exports = SubCategoryController;