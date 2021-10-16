const { User, Store, Address, Product } = require('../models/index');
const { Op } = require('sequelize');
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

    funcUpdateCart = async (userId, cart) => {
        let allIds = await cart.map((item) => {
            return item.id;
        });
        let allQuantity = await cart.map((item) => {
            return item.quantity;
        });
        let products = [];
        for (const [i, id] of allIds.entries()) {
            let product = await Product.findByPk(id);
            product = {
                ...product.dataValues,
                quantity: allQuantity[i],
            };
            products = [...products, product];
        }
        const user = await this.model.findOne({
            where: {
                id: userId,
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
        user.Cart = products;
        return await user.save();
    };
    updateCart2 = async (req, res) => {
        let Cart;
        try {
            const { id, item, que, cant } = req.body;

            let result = await this.model.findOne({ where: { id } });

            if (result) {
                Cart = result.Cart;
            }
            if (Cart.length > 0) {
                const result = Cart.find((el) => el.id === item.idProduct);
                if (!result) {
                    const producto = await Product.findOne({ where: { id: item.idProduct } });
                    Cart.push({ ...producto.dataValues, quantity: Number(item.quantity) });
                } else {
                    Cart = Cart.map((el) => {
                        if (el.id === item.idProduct) {
                            if (que === '+') {
                                return {
                                    ...el,
                                    quantity: Number(el.quantity) + Number(cant),
                                };
                            } else {
                                return {
                                    ...el,
                                    quantity: Number(el.quantity) - Number(cant),
                                };
                            }
                        } else {
                            return el;
                        }
                    });
                }
                Cart = Cart.filter((el) => el.quantity > 0);

                await this.model.update({ Cart }, { where: { id } });
                const user = await this.model.findOne({ where: { id } });
                res.json([...user.Cart]);
            } else {
                const producto = await Product.findOne({ where: { id: item.idProduct } });
                Cart.push({ ...producto.dataValues, quantity: Number(item.quantity) });

                await this.model.update({ Cart }, { where: { id } });
                const user = await this.model.findOne({ where: { id } });
                res.json([...user.Cart]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    getUserById = async (req, res) => {
        const id = req.params.id;
        try {
            const user = await this.model.findByPk(id);
            let cart = user.dataValues.Cart.map((el) => {
                return { id: el.id, quantity: el.quantity };
            });
            const update = await this.funcUpdateCart(id, cart);
            res.json(update);
        } catch (error) {
            res.json(error);
        }
    };

    bulkCreateUser = async (req, res) => {
        try {
            let allUsers = req.body.users;
            let users = await this.model.bulkCreate(allUsers);
            res.send(users);
        } catch (err) {
            res.send(err);
        }
    };

    updateCart = async (req, res) => {
        const { userId, cart } = req.body;
        if (userId) {
            try {
                const user = await this.funcUpdateCart(userId, cart);
                res.json(user.Cart);
            } catch (error) {
                res.send(error);
            }
        } else {
            res.send('wrong data');
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
