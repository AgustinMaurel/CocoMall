const { Store, User } = require('../models/index');
const ModelController = require('./index');

class StoreModel extends ModelController {
  constructor(model) {
    super(model);
  }
  //Specific Functions for this model
  createStore = async (req, res) => {
    if (req.body.storeName) {
      try {
        const id = req.body.id ? req.body.id : null;
        const store = {
          storeName: req.body.storeName,
          address: req.body.address ? req.body.address : null,
        };
        const tienda = await Store.create(store)
        const idTienda = tienda.id
        const usuario = await User.findByPk(id)
        res.send(tienda)

      } catch (e) {
        res.send(e);
      }
    } else {
      res.status(400).send({ message: 'Wrong parameters' });
    }
  };
}

const StoreController = new StoreModel(Store);

module.exports = StoreController;
