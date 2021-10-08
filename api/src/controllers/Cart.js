const { Cart, Product, User, Item } = require('../models/index');
const ModelController = require('./index');

class OrderModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    getProduct = async (req, res) => {
        let user = req.body.userID;
        let carrito = await this.model.findOne({ where: { UserId: user } });

        let listado = await Item.findAll({
            where: { CartId: carrito.id },
            include: [{ model: Product }],
        });
        res.json({
            listado,
        });
    };

    addToCart = async (req, res) => {
        let idUser = req.body.idUser;
        let product = req.body.idProduct;
        let quantity = req.body.quantity;

        const [answer, create] = await this.model.findOrCreate({
            where: { UserId: idUser },
        });

        const [data, create1] = await Item.findOrCreate({
            where: { ProductId: product, CartId: answer.id },
            defaults: { quantity },
        });

        if (create1) {
            await data.setCart(answer.id);
        } else {
            await data.update({ quantity: data.quantity + quantity });
        }
        res.json(answer);
    };

    deleteFromCart = async (req, res) => {
        let user = req.body.userID;
        let product = req.body.idProduct;
        let quantity = req.body.quantity;

        let carrito = await this.model.findOne({ where: { UserId: user } });

        let item = await Item.findOne({
            where: { CartId: carrito.id, ProductId: product },
        });

        if (item.quantity === 1 || item.quantity === quantity) {
            await Item.destroy({ where: { id: item.id } });
        } else {
            await item.update({ quantity: item.quantity - quantity });
        }
        res.json('borrado con exito');
    };

    clearCart = async (req, res) => {
        let user = req.body.userID;
        let carrito = await this.model.findOne({ where: { UserId: user } });
        await Item.destroy({ where: { CartId: carrito.id } });
        res.json('limpiado');
    };
}

const OrderController = new OrderModel(Cart);

module.exports = OrderController;
