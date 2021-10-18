const { Order, User, Store, Address } = require('../models/index');
const ModelController = require('./index');

class OrderModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createOrder = async (req, res) => {
        const {userId, storeId, address, cords, amount, orderState} = req.body;

        if (userId && storeId && address && cords) {
            try {
                const order = {
                    amount,
                    orderState,
                };

                // create Order
                const newOrder = await this.model.create(order);
                const orderId = newOrder.id;
                // add User to order
                const user = await User.findByPk(userId);
                await user.addOrder(orderId);

                // PROBAAAAR


                // let obj = {OrdersHistory: [...user.OrdersHistory, ...orderId]}
                // const userNew = await User.update(obj, {where: {id: userId}})

                
                // add Store to order
                const store = await Store.findByPk(storeId);
                await store.addOrder(orderId);
                //add Address to order
                const [shipmentAdress, created] = await Address.findOrCreate({
                    where: {
                        address,
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
}

const OrderController = new OrderModel(Order);

module.exports = OrderController;