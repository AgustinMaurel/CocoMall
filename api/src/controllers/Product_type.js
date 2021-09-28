const { Product_Type } = require('../models/index')
const ModelController = require('./index')

class Product_TypeModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const Product_TypeController = new Product_TypeModel(Product_Type)

module.exports = Product_TypeController