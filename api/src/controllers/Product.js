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
                const productId = newProduct.id
                //Attach the new product with the Store
                const store = await Store.findByPk(storeId)
                await store.addProduct(productId)
                //Attach the new product with his Type
                const productType = await ProductType.findByPk(typeId)
                await productType.addProduct(productId)
                //Get the updeted product
                const finalProduct = await this.model.findByPk(productId)
                res.send(finalProduct);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    bulkCreateProducts = async (req, res) => {
        const allProducts = req.body.products;
        const allIds = req.body.ids
        if (typeof allProducts === 'object') {
            try {
                const products = await this.model.bulkCreate(allProducts)
                products.forEach((product, i) => {
                    //Each Product we need the id
                    let productId = product.id
                    let storeId = allIds[i].storeId
                    let typeId = allIds[i].typeId
                    //Attach the new product with the Store
                    const store = await Store.findByPk(storeId)
                    await store.addProduct(productId)
                    //Attach the new product with his Type
                    const productType = await ProductType.findByPk(typeId)
                    await productType.addProduct(productId)
                });
                //Get all products updeted
                const finalProducts = await this.model.findAll()
                res.send(finalProducts)
            } catch (error) {
                res.send(error);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    }
}

const ProductController = new ProductModel(Product)

module.exports = ProductController