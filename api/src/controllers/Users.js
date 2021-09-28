//import al modelo
const { User } = require('../models/index')
const ModelController = require('./index')
//getAllData
class UserModel extends ModelController {
    constructor(model) {
        super(mudel);
    }
    //Specific Functions for this model
}

const UserController = new UserModel(User)

module.exports = UserController