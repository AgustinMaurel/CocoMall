const { User, Store, Address } = require("../models/index");
const ModelController = require("./index");
class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model

    createUser = (req, res) => {
        const { Name, LastName, Mail } = req.body;
        try {
            User.create({
                Name,
                LastName,
                Mail,
            }).then((e) => {
                return res.json(e);
            });
        } catch (err) {
            return res.status(400).json(err);
        }
    };

    getAllData = async (req, res, next) => {
        let data = await User.findAll({
            include: [
                //include the related tables and the specific cloumn that they have attached
                {
                    model: Store,
                    attributes: ["storeName"],
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
