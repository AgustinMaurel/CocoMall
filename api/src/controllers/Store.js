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
          description: req.body.description ? req.body.description : null,
          image: req.body.image
            ? req.body.image
            : 'https://img.freepik.com/vector-gratis/personas-pie-cola-tienda_23-2148594615.jpg?size=626&ext=jpg',
        };
        const newStore = await Store.create(store);
        const storeId = newStore.id;

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
    try{
      let data = await Store.findAll();
      res.send(data)
    }catch(e){
      next(e)
    }
  }
}

const StoreController = new StoreModel(Store);

module.exports = StoreController;
