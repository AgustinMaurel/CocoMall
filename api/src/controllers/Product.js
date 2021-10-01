const { Product, Store, ProductType } = require('../models/index');
const { prototype } = require('./index');

const ModelController = require('./index')

class ProductModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createProduct = async (req, res) => {
        //ID of Store
        const storeId = req.body.storeId
        const typeId = req.body.typeId
        if (storeId && typeId) {
            try {
                const product = {
                    ProductName: req.body.name,
                    Price: req.body.price,
                    Stock: req.body.stock,
                    SellBy: req.body.sellBy,
                    Description: req.body.description,
                    Image: req.body.image,
                }
                //Create new Product
                const newProduct = await this.model.create(product)
                const ProductId = newProduct.id
                //Attach the new product with the Store
                const store = await Store.findByPk(storeId)
                await store.addProduct(ProductId)
                //Attach the new product with his Type
                const productType = await ProductType.findByPk(typeId)
                await productType.addProduct(ProductId)
                const finalProduct = await this.model.findByPk(ProductId)
                console.log(finalProduct)
                res.send(finalProduct);
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