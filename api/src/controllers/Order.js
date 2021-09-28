const { Order } = require('../models/index')
const ModelController = require('./index')

class OrderModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const OrderController = new OrderModel(Order)

module.exports = OrderController