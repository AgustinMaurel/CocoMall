const { Product, Store, ProductType } = require('../models/index');
const { cloudinary } = require('../utils/cloudinary/index');
const { Op } = require('sequelize');
const ModelController = require('./index');
// filterProductsByStore
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
          : ['No image base64 string'];
        let img = [];
        for (let x = 0; x < fileString.length; x++) {
          img[x] = await cloudinary.uploader.upload(fileString[x], {
            folder: 'Products',
          });
        }
        let public_id = img.map((el) => el.public_id);

        //Get the Product from body
        const product = {
          ...req.body.product,
          cloudImage: public_id ? public_id : ['No image id'],
        };

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
    const { storeId, allTypes, products } = req.body;
    try {
      const productsDB = await this.model.bulkCreate(products);
      for (const [i, product] of productsDB.entries()) {
        const productId = product.id;
        const productTpeId = allTypes[i];
        //Attach the new product with the Store
        const store = await Store.findByPk(storeId);
        await store.addProduct(productId);
        //Attach the new product with his Type
        const productType = await ProductType.findByPk(productTpeId);
        await productType.addProduct(productId);
      }
      //lindo msj
      res.send('Successfully Created');
    } catch (error) {
      res.send(error);
    }
  };

  filterProductsByStore = async (req, res) => {
    //Id of the store from which i need products
    const storeId = req.params.id;
    if (storeId) {
      try {
        //Array of the Types of products (on ID forms) that i need
        const allTypes = req.body.types || [];
        const nameToFilter = req.body.name || '';
        const min = req.body.min || 0;
        const max = req.body.max || Math.pow(99, 99);
        const discount = req.body.discount || 0;
        const filteredProducts = await this.model.findAll({
          where: {
            StoreId: storeId,
            [Op.and]: {
              ProductTypeId: {
                [Op.or]: allTypes,
              },
              productName: {
                [Op.iLike]: `%${nameToFilter}%`,
              },
              price: {
                [Op.and]: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
              discount: {
                [Op.gte]: discount,
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

  updateDataProduct = async (req, res) => {
    const id1 = req.params.id;
    const { product } = req.body;


    if (product.cloudImage) {
      // Corregir para hacerlo con muchas imagenes
      let img = [];
      for (let i = 0; i < product.cloudImage.length; i++) {
        img[i] = await cloudinary.uploader.upload(product.cloudImage[i], {
          folder: 'Products',
        });
      }
      let public_id = img.map((el) => el.public_id);

      const old = await this.model.findByPk(id1);
      product.cloudImage = old.cloudImage.concat(public_id); // [...old.cloudImage, ...public_id]
    }

    const ProductoActualizado = await this.model.update(
      { ...product },
      { where: { id: id1 } }
    );

    res.json({
      msg: 'Updated product ok',
      ProductoActualizado,
    });
  };

  deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (id) {
      try {
        const product = await this.model.findByPk(id);
        const deletedImages = await cloudinary.api.delete_resources(
          product.cloudImage[0],
          { folder: 'Products' }
        );
        const deleted = await this.model.destroy({ where: { id: id } });
        if (deleted === 1) {
          res.json({ message: 'Product successfully deleted' });
        } else {
          res.json({ message: 'Error' });
        }  
      } catch (e) {
        res.send(e);
      }
    }
  };

  findAllProductsByIds = async (req, res) => {
    const { allIds } = req.body;
    const allProducts = await this.model.findAll({
      where: {
        id: {
          [Op.or]: allIds,
        },
      },
    });
    res.send(allProducts);
  };


}

const ProductController = new ProductModel(Product);

module.exports = ProductController;
