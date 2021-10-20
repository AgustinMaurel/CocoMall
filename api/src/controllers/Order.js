const e = require('express');
const { Order, User, Store, Address, Product } = require('../models/index');
const ModelController = require('./index');

class OrderModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createOrder = async (req, res) => {
        const { userId, storeId, address, cords, amount, orderState, arrayIdProducts } = req.body;
        if (userId && storeId && address && cords && arrayIdProducts) {
            try {
                let stock = [];
                const idProducts = arrayIdProducts.map((e) => e.id);
                const quantity = arrayIdProducts.map((e) => e.quantity);
                let products = await Product.findAll({
                    where: {
                        id: idProducts,
                    },
                });
                products = products.map((e) => e.dataValues);
                // add quantity, total purchase
                products.map((e, i) => {
                    e.quantity = quantity[i];
                    e.totalPurchase = quantity[i] * e.price;
                    stock.push(e.stock);
                });
                console.log(products, '<----- id Products');
                // create order
                const order = {
                    amount,
                    orderState,
                    arrayIdProducts: products,
                };
                // rest quantity in the stock
                let stockUpdate = stock.map((e, i) => {
                    let rest = e - quantity[i];
                    return rest;
                });
                // search the product and asign the new stock
                for (let i = 0; i < idProducts.length; i++) {
                    let modificado = await Product.update(
                        { stock: stockUpdate[i] },
                        { where: { id: idProducts[i] } },
                    );
                }

                // create Order
                const newOrder = await this.model.create(order);
                console.log(newOrder, ' new order');
                const orderId = newOrder.id;
                // add User to order
                const user = await User.findByPk(userId);
                await user.addOrder(orderId);

                // PROBAAAAR

                let obj = {
                    OrdersHistory: [{ order: orderId, address: address }, ...user.OrdersHistory],
                };
                const userNew = await User.update(obj, { where: { id: userId } });

                // add Store to order
                const store = await Store.findByPk(storeId);
                await store.addOrder(orderId);
                //add Address to order
                const [shipmentAdress] = await Address.findOrCreate({
                    where: {
                        directions: address,
                        cords,
                        UserId: userId,
                    },
                });
                await shipmentAdress.addOrder(orderId);
                res.send(newOrder);
            } catch (err) {
                res.send(err);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    deleteOrder = async (req, res) => {
        const id = req.params.id;
        if (id) {
            await this.model.destroy({
                where: {
                    id: id,
                },
            });
            res.send('Order Deleted');
        } else {
            res.status(400).send('Wrong params');
        }
    };
}

const OrderController = new OrderModel(Order);

module.exports = OrderController;
