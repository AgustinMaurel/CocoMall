const {User, Store, Address} = require("../models/index");
const ModelController = require("./index");
class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    createUser = (req, res) => {
        const {Name, LastName, Mail} = req.body;

        try {
            User.create({
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
    getAllData = async (req, res, next) => {
        let data = await User.findAll({
            include: [
                {
                    model: Store,
                    attributes: ["store_name"],
                },
                {
                    model: Address,
                    attributes: ["directions"],
                },
            ],
        }).catch((err) => {
            next(err);
        });
        res.send(data);
    };
}

const UserController = new UserModel(User);

module.exports = UserController;
