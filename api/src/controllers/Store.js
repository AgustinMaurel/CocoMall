const { Store } = require('../models/index')
const ModelController = require('./index')

class StoreModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const StoreController = new StoreModel(Store)

module.exports = StoreController