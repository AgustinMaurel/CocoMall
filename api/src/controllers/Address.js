const { Address } = require('../models/index')
const ModelController = require('./index')

class AddressModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const AddressController = new AddressModel(Address)

module.exports = AddressController