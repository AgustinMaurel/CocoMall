const { User, Store, Address } = require('../models/index');
const ModelController = require('./index');
class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model

    createUser = async (req, res) => {
        const user = req.body;
        if (typeof user === 'object') {
            try {
                let newUser = await this.model.create(user);
                res.send(newUser);
            } catch (error) {
                res.json(error);
            }
        } else {
            res.status(400).send('Wrong parameters');
        }
    };

    getAllData = async (req, res) => {
        try {
            let user = await this.model.findAll({
                include: [
                    //include the related tables and the specific cloumn that they have attached
                    {
                        model: Store,
                        attributes: ['storeName'],
                    },
                    {
                        model: Address,
                        attributes: ['directions'],
                    },
                ],
            });
            res.send(user);
        } catch (error) {
            res.send(error);
        }
    };

    getUserById = async (req, res) => {
        const id = req.params.id;
        try {
            let user = await this.model.findAll({
                where: {
                    id: id,
                },
                include: [
                    //include the related tables and the specific cloumn that they have attached
                    {
                        model: Store,
                        attributes: ['storeName'],
                    },
                    {
                        model: Address,
                        attributes: ['directions'],
                    },
                ],
            });
            res.send(user);
        } catch (error) {
            res.json(error);
        }
    };

    bulkCreateUser = async (req, res, next) => {
        try {
            let allUsers = req.body;
            let users = await this.model.bulkCreate(allUsers);
            res.send(users);
        } catch (err) {
            res.send(err);
        }
    };

    getFindId = async (req, res, next) => {
        const { id } = req.body;
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
