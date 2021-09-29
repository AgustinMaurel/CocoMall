const { User } = require('../models/index')
const ModelController = require('./index')

class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const UserController = new UserModel(User)

module.exports = UserController