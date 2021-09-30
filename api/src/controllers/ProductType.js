const { ProductType } = require('../models/index')
const ModelController = require('./index')

class ProducTypeModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const ProductTypeController = new ProducTypeModel(ProductType)

module.exports = ProductTypeController