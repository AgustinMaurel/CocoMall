const {Order, User, Store, Address} = require("../models/index");
const ModelController = require("./index");

class OrderModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createOrder = async (req, res, next) => {
        const userId = req.body.userId;
        const storeId = req.body.storeId;
        const addressId = req.body.addressId;

        if (userId && storeId && addressId) {
            try {
                const order = {
                    amount: req.body.amount,
                    orderState: req.body.orderState,
                };

                // create Order
                const newOrder = await this.model.create(order);

                const orderId = newOrder.id;
                // add User to order
                const user = await User.findByPk(userId);
                await user.addOrder(orderId);
                // add Store to order
                const store = await Store.findByPk(storeId);
                await store.addOrder(orderId);
                //add Address to order
                const address = await Address.findByPk(addressId);
                await address.addOrder(orderId);

                res.send(newOrder);
            } catch (err) {
                res.send(err);
            }
        } else {
            res.status(400).send({message: "Wrong parameters"});
        }
    };
}

const OrderController = new OrderModel(Order);

module.exports = OrderController;
