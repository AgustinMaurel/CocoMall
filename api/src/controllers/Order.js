const {Order, User, Store, Address} = require("../models/index");
const ModelController = require("./index");

class OrderModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createOrder = async (req, res) => {
        const {UserId, StoreId, address, cords, amount, orderState} = req.body;

        if (UserId && StoreId && address && cords) {
            try {
                const order = {
                    amount,
                    orderState,
                };

                // create Order
                const newOrder = await this.model.create(order);
                const orderId = newOrder.id;
                // add User to order
                const user = await User.findByPk(UserId);
                await user.addOrder(orderId);

                // PROBAAAAR


                // let obj = {OrdersHistory: [...user.OrdersHistory, ...orderId]}
                // const userNew = await User.update(obj, {where: {id: UserId}})

                
                // add Store to order
                const store = await Store.findByPk(StoreId);
                await store.addOrder(orderId);
                //add Address to order
                // const shipmentAdress = await Address.findOrCreate({
                //     where: {
                //         address,
                //         cords,
                //         UserId: UserId,
                //     },
                // });

                // await shipmentAdress.addOrder(orderId);
                res.send(newOrder);
            } catch (err) {
                res.send(err);
            }
        } else {
            res.status(400).send({message: "Wrong parameters"});
        }
    };

    allOrderStore = async (req, res) => {
        const {StoreId} = req.params;
        if (StoreId) {
            try {
                const Orders = await this.model.findAll({where: {StoreId}});
                res.send(Orders);
            } catch (err) {
                res.status(400).send({message: err});
            }
        } else {
            res.status(400).send({message: "Wrong parameter"});
        }
    };
}

const OrderController = new OrderModel(Order);

module.exports = OrderController;
