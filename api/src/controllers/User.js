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
                        attributes: ['id', 'address', 'cords'],
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
        // console.log(id)
        try {
            let user = await this.model.findByPk(id)
            // let user = await this.model.findOne({
            //     where: {
            //         id: id
            //     },
            //     include: [
            //         //include the related tables and the specific cloumn that they have attached
            //         {
            //             model: Store,
            //             attributes: ['storeName'],
            //         },
            //         {
            //             model: Address,
            //             attributes: ['directions'],
            //         },
            //     ],
            // });
            // console.log(user)
            res.send(user);
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
                let allIds = await cart.map((item) => {
                    return item.idProduct;
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
                });
                user.Cart = products;
                await user.save();
                res.json(products);
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

    deleteUser = async (req, res) => {
        const id = req.params.id
        const user = await this.model.findByPk(id)
        user.Active = "False"
        res.send(await user.save())
    }
    
    activateUser = async (req, res) => {
        const id = req.params.id
        const user = await this.model.findByPk(id)
        user.Active = "True"
        res.send(await user.save())
    }

    // deleteUser = async (req, res) => {
    //     const id = req.params.id
    //     const DbUser = await this.model.findOne({
    //         where: {
    //             id: id
    //         },
    //         include: [
    //             //include the related tables and the specific cloumn that they have attached
    //             {
    //                 model: Store,
    //                 attributes: ['id'],
    //                 include: [{
    //                     model: Product,
    //                     attributes: ["id"]
    //                 }]
    //             },
    //             {
    //                 model: Address,
    //                 attributes: ['id'],
    //             },
    //         ]
    //     })
    //     const user = DbUser.dataValues
    //     //get all the id of the stores to delete and their Products
    //     if (user.Stores.length) {
    //         let prodcutsToDelete = []
    //         const stor = await user.Stores.map(async store => {
    //             const products = store.dataValues.Products
    //             await products?.map(products => {
    //                 prodcutsToDelete = [...prodcutsToDelete, products.dataValues.id]
    //             })
    //             return store.dataValues.id
    //         })
    //         console.log(prodcutsToDelete)
    //         console.log(stor)
    //         await Store.destroy({
    //             where: {
    //                 id: {
    //                     [Op.in]: stor
    //                 }
    //             }
    //         })
    //         await Product.destroy({
    //             where: {
    //                 id: {
    //                     [Op.in]: prodcutsToDelete
    //                 }
    //             }
    //         })
    //     }
    //     if (user.Addresses.length) {
    //         const addresses = user.Addresses.map(address => {
    //             return address.dataValues.id
    //         })
    //         await Address.destroy({
    //             where: {
    //                 id: {
    //                     [Op.in]: addresses
    //                 }
    //             }
    //         })
    //     }
    //     await this.model.destroy({
    //         where: {
    //             id: id
    //         }
    //     })
    //     res.send("deleted")
    // }
}

const UserController = new UserModel(User);

module.exports = UserController;
