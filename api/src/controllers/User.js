const { User, Store, Address, Product } = require('../models/index');
const { Op } = require('sequelize');
const ModelController = require('./index');

const admin =require('../utils/firebase-admin/admin')


class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model

    createUser = async (req, res) => {
        const user = req.body;
        if (typeof user === 'object') {
            try {
                let all = await this.model.findAll()
                if(all.length === 0){
                user.SuperAdmin = true
                }
                
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
                        attributes: ['id', 'directions', 'cords'],
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
                    attributes: ['id', 'directions', 'cords'],
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
                    Cart.push({ ...producto.dataValues, quantity: Number(cant) });
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
                Cart.push({ ...producto.dataValues, quantity: Number(cant) });

                await this.model.update({ Cart }, { where: { id } });
                const user = await this.model.findOne({ where: { id } });
                res.json([...user.Cart]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    clearCart2 = async (req, res) => {
        const { id } = req.body;
        await this.model.update({ Cart: [] }, { where: { id } })
        const user = this.model.findOne({ where: { id } })
        res.json({ user })
    }


    getUserById = async (req, res) => {
        const id = req.params.id;
        try {
            const user = await this.model.findByPk(id)
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

    putUser = async (req, res, next) => {
        const { id, Country, State } = req.body;
        try {
            let updateUser = this.model.update({ Country, State }, { where: { id } })
            res.json(updateUser);
        } catch (error) {
            res.json({
                errores: error
            })
        }
    }

    deleteUser = async (req, res) => {
        const id = req.params.id
            await admin.auth().deleteUser(id);
        const DbUser = await this.model.findOne({
            where: {
                id: id
            },
            include: [
                //include the related tables and the specific cloumn that they have attached
                {
                    model: Store,
                    attributes: ['id'],
                    // include: [{
                    //     model: Product,
                    //     attributes: ["id"]
                    // }]
                },
                {
                    model: Address,
                    attributes: ['id'],
                },
            ]
        })
        const user = DbUser.dataValues
        //get all the id of the stores to delete and their Products
        if (user.Stores.length) {
            const stor = await user.Stores.map(store => {
                return store.dataValues.id
            })
            for (const storeId of stor) {
                await Product.destroy({
                    where: {
                        StoreId: storeId
                    }
                })
            }
            await Store.destroy({
                where: {
                    UserId: id
                }
            })
        }
        if (user.Addresses.length) {
            await Address.destroy({
                where: {
                    Usersid: id
                }
            })
        }
        await this.model.destroy({
            where: {
                id: id
            }
        })
        res.send("deleted")
    }
    
banUser =async(req,res,next)=>{
    let {id,boolean}=req.body;
    let resultado=await  admin.auth().updateUser(id,{disabled:boolean})
    res.json(resultado);
}

updatePassworEmail=async(req,res,next)=>{
    try{
        const {act,id} =req.body;
        await admin.auth().updateUser(id,{...act});
        act.email!==null?await this.model.update(
            { Mail:act.email
            },
            {
                where: {
                    id,
                },
            }
        ):null;
        
        res.json({
            msg:"se modifico con exito",
        })

    }catch(e){
        res.send(e)
    }
}



}

const UserController = new UserModel(User);

module.exports = UserController;