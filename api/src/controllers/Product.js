const { Product, Store, ProductType } = require('../models/index');
const { cloudinary } = require('../utils/cloudinary/index');
const { Op } = require('sequelize');
const ModelController = require('./index');

class ProductModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createProduct = async (req, res) => {
        //ID of Store
        const storeId = req.body.storeId;
        const typeId = req.body.typeId;
        if (storeId && typeId) {
            try {
                //Cloudinary
                const fileString = req.body.idImage
                    ? req.body.idImage
                    : 'No image base64 string';
                const uploadedResponse = await cloudinary.uploader.upload(
                    fileString
                );
                let public_id = uploadedResponse.public_id;
                //Get the Product from body
                const product = { ...req.body.product, cloudImage: public_id };
                //Create new Product
                const newProduct = await this.model.create(product);
                const productId = newProduct.id;
                //Attach the new product with the Store
                const store = await Store.findByPk(storeId);
                await store.addProduct(productId);
                //Attach the new product with his Type
                const productType = await ProductType.findByPk(typeId);
                await productType.addProduct(productId);
                //Get the updeted product
                const finalProduct = await this.model.findByPk(productId);
                res.send(finalProduct);
            } catch (error) {
                res.send(error);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    bulkCreateProducts = async (req, res) => {
        const allProducts = req.body.products;
        const allIds = req.body.ids;
        if (typeof allProducts === 'object') {
            try {
                const products = await this.model.bulkCreate(allProducts);
                products.forEach(async (product, i) => {
                    //Each Product we need the id
                    let productId = product.id;
                    let storeId = allIds[i].storeId;
                    let typeId = allIds[i].typeId;
                    //Attach the new product with the Store
                    const store = await Store.findByPk(storeId);
                    await store.addProduct(productId);
                    //Attach the new product with his Type
                    const productType = await ProductType.findByPk(typeId);
                    await productType.addProduct(productId);
                });
                //lindo msj
                res.send('Successfully Created');
            } catch (error) {
                res.send(error);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    filterProductsByTypeAndName = async (req, res) => {
        //Id of the store from which i need products
        const storeId = req.params.id;
        if (storeId) {
            try {
                //Array of the Types of products (on ID forms) that i need
                const allTypes = req.body.types || [];
                const nameToFilter = req.body.name || '';
                const min = req.body.min || 0;
                const max = req.body.max || 99 ^ 9999;
                const filteredProducts = await this.model.findAll({
                    where: {
                        StoreId: storeId,
                        ProductTypeId: {
                            [Op.or]: allTypes,
                        },
                        ProductName: {
                            [Op.iLike]: `%${nameToFilter}%`,
                        },
                        Price: {
                            [Op.and]: {
                                [Op.gte]: min,
                                [Op.lte]: max,
                            },
                        },
                    },
                });
                res.send(filteredProducts);
            } catch (error) {
                res.send(error);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    findAllProductsOfStore = async (req, res) => {
        const storeId = req.params.id;
        if (storeId) {
            try {
                const allProductOfStore = await this.model.findAll({
                    where: {
                        StoreId: storeId,
                    },
                });
                res.send(allProductOfStore);
            } catch (error) {
                res.send(error);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };
}

const ProductController = new ProductModel(Product);

module.exports = ProductController;
