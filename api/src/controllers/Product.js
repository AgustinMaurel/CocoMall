//import al modelo
const { Product} = require('../models/index')
const ModelController = require('./index')
//getAllData
class ProcuctModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const ProductController = new UserModel(Product)

module.exports = ProcuctModel