const {User, Store, Address} = require("../models/index");
const ModelController = require("./index");
class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model

    createUser = (req, res) => {
        const {id, Name, LastName, Mail} = req.body;
        try {
            User.create({
                id,
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
    getFindId = async (req, res, next) => {
        const {id} = req.body;
        let data = await User.findByPk(id);
        //cambiar a futuro &&
        if (data) {
            return res.status(302).json(true);
        } else {
            return res.status(404).json(false);
        }
    };
    
}

const UserController = new UserModel(User);

module.exports = UserController;
