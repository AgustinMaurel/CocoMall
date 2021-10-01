const { Product, Store } = require('../models/index');

const ModelController = require('./index')

class ProductModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model

    createProduct = async (req, res) => {
        const elemento = {
            "id": req.body.id,
            "ProductName": req.body.name,
            "Price": req.body.Price,
            "Stock": req.body.Stock,
            "Unity": req.body.Unity,
            "Description": req.body.Description,
            "Image": req.body.Image,
        }
        if (req.body.id) {
            try {
                //ID of Store
                const id = req.body.id ? req.body.id : null;
                const product = {
                    ...elemento
                };
                //Create new Product
                const newProduct = await Product.create(product)
                const ProductId = newProduct.id
                //Attach the new product with the Store
                const store = await Store.findByPk(id)
                await store.addProduct(ProductId)
                res.send("funciono");
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };
}

const ProductController = new ProductModel(Product)

module.exports = ProductController