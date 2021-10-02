const { Store, User, Product } = require('../models/index');
const ModelController = require('./index');
const { Op } = require("sequelize");

class StoreModel extends ModelController {
  constructor(model) {
    super(model);
  }
  //Specific Functions for this model
  createStore = async (req, res) => {
    if (req.body.id) {
      try {
        //id of User
        const id = req.body.id;
        const store = {
          storeName: req.body.storeName,
          address: req.body.address ? req.body.address : null,
          description: req.body.description ? req.body.description : null,
          image: req.body.image
            ? req.body.image
            : 'https://img.freepik.com/vector-gratis/personas-pie-cola-tienda_23-2148594615.jpg?size=626&ext=jpg',
        };
        //create the new Store
        const newStore = await Store.create(store);
        const storeId = newStore.id;
        //Attach the Store with the User ID
        const user = await User.findByPk(id);
        await user.addStore(storeId);

        res.send(newStore);
      } catch (e) {
        res.send(e);
      }
    } else {
      res.status(400).send({ message: 'Wrong parameters' });
    }
  };

  getAllData = async (req, res, next) => {
    try {
      let data = await Store.findAll();
      res.send(data)
    } catch (e) {
      next(e)
    }
  }

  postBulkCreate = async (req, res) => {
    const allStore = req.body.Store;
    const allId = req.body.Ids;
    if (typeof allStore === 'object') {
      try {
        let stores = await this.model.bulkCreate(allStore);
        stores.forEach(async (store, i) => {
          //Get the id of each store
          const storeId = store.id
          //Attach the Store with the User ID
          const user = await User.findByPk(allId[i]);
          await user.addStore(storeId);
        });
        //lindo msj
        res.send('Successfully Created');
      } catch (error) {
        res.send(error);
      }
    } else {
      res.status(400).send({ message: 'Wrong parameters' })
    }
  }

  filterStoresByProductTypes = async (req, res) => {
    const typesId = req.body.types || []
    const nameToFilter = req.body.name || ""
    try {
      const filteredStores = await this.model.findAll({
        include: {
          model: Product,
          attributes: ["ProductTypeId", "ProductName"],
          where: {
            ProductTypeId: {
              [Op.or]: typesId
            },
            ProductName: {
              [Op.iLike]: `%${nameToFilter}%`
            }
          }
        },
      })
      res.send(filteredStores)
    } catch (error) {
      res.send(error)
    }
  }
}

const StoreController = new StoreModel(Store);

module.exports = StoreController;
