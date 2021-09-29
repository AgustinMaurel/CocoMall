const {User} = require("../models/index");
const ModelController = require("./index");
const {v4: uuidv4} = require("uuid");
class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    createUser = (req, res) => {
        const {Name, LastName, Mail} = req.body;
        
        try {
            User.create({
                id: uuidv4(),
                Name: Name,
                LastName: LastName,
                Mail: Mail,
            }).then((e) => {
                return res.json(e);
            });
        } catch (err) {
            return res.status(400).json(err);
        }
    };
    //Specific Functions for this model
}

const UserController = new UserModel(User);

module.exports = UserController;
