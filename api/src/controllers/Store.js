const { Store } = require('../models/index')
const ModelController = require('./index')

class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const StoreController = new UserModel(Store)

module.exports = StoreController