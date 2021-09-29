const { User } = require('../models/index')
const ModelController = require('./index')

class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    getAllUsers = async (req,res)=> {
        const users = await this.findData()
        res.send(users)
    }
}

const UserController = new UserModel(User)

module.exports = UserController