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
        const newStore = await Store.create(store)
        const storeId = newStore.id

        const user = await User.findByPk(id)
        let relation = await user.addStore(storeId)

        res.send({msg: "Store created succesfully!"})

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
