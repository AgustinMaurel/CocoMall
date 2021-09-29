const { Store } = require('../models/index');
const { User } = require('../models/index.js');
const ModelController = require('./index');

class StoreModel extends ModelController {
  constructor(model) {
    super(model);
  }
  //Specific Functions for this model
  createStore = (req, res) => {
    if (typeof req.body.name === 'string') {
      try {
        const id = req.body.id ? req.body.id : null;
        const store = {
          store_name: req.body.name,
          address:
            typeof req.body.address === 'string' ? req.boyd.address : null,
        };
        User.findByPk(id)
          .then((response) => response.addStore(store))
          .then((response) => res.json(response));
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
