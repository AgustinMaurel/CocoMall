//import al modelo
const { Product} = require('../models/index')
const ModelController = require('./index')
//getAllData
class ProductModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const ProductController = new ProductModel(Product)

module.exports = ProductController