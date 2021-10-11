const { Cart, Product, User, Item } = require('../models/index');
const ModelController = require('./index');

class OrderModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    getCart = async (req, res) => {
        try {
            let idUser = req.body.idUser;
            let carrito = await this.model.findOne({
                where: {
                    UserId: idUser,
                },
                include: {
                    model: Item,
                    attributes: ['cantidad'],
                    include: {
                        model: Product,
                        attributes: [
                            'id',
                            'productName',
                            'price',
                            'stock',
                            'description',
                            'cloudImage',
                        ],
                    },
                },
            });
           
            res.send(carrito);
           
        } catch (err) {
            console.error(err);
        }
    };

    addToCart = async (req, res) => {
        try {
            let idUser = req.body.idUser;
            let product = req.body.idProduct;
            let cantidad = req.body.quantity;

          

            const [answer, create] = await this.model.findOrCreate({
                where: { UserId: idUser },
            });

            const [data, create1] = await Item.findOrCreate({
                where: { ProductId: product, CartId: answer.id },
                defaults: { cantidad },
            });

            if (create1) {
                await data.setCart(answer.id);
            } else {
                await data.update({ cantidad: data.cantidad + cantidad });
            }
            res.json(answer);
        } catch (err) {
            console.log(err);
        }
    };

    deleteFromCart = async (req, res) => {
        try {
            let user = req.body.idUser;
            let product = req.body.idProduct;
            let cantidad = req.body.quantity;

            let carrito = await this.model.findOne({ where: { UserId: user } });

            let item = await Item.findOne({
                where: { CartId: carrito.id, ProductId: product },
            });

            if (item.cantidad === 1 || item.cantidad === cantidad) {
                await Item.destroy({ where: { id: item.id } });
            } else {
                await item.update({ cantidad: item.cantidad - cantidad });
            }
            res.json('borrado con exito');
        } catch (err) {
            console.log(err);
        }
    };

    clearCart = async (req, res) => {
        try {
            let user = req.body.idUser;
            let carrito = await this.model.findOne({ where: { UserId: user } });
            await Item.destroy({ where: { CartId: carrito.id } });
            res.json('limpiado');
        } catch (err) {
            console.log(err);
        }
    };
}

const OrderController = new OrderModel(Cart);

module.exports = OrderController;
