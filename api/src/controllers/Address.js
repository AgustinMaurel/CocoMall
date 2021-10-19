const { Address, User } = require('../models/index');
const ModelController = require('./index');

class AddressModel extends ModelController {
  constructor(model) {
    super(model);
  }
  //Specific Functions for this model
  createAddress = async (req, res) => {
    const { id, directions, cords } = req.body;
    if (id) {
      try {
        //id of User
        const address = {
          directions,
          cords: cords
        };
        //Create the Address
        const newAddress = await this.model.create(address);
        const addressId = newAddress.id;
        //Search the User and attach the Address
        const user = await User.findByPk(id);
        await user.addAddress(addressId);

        const finalAddress = await this.model.findByPk(addressId)

        res.send(finalAddress);
      } catch (e) {
        res.send(e);
      }
    } else {
      res.status(400).send({ message: 'Wrong parameters' });
    }
  };
  getIdData = async (req, res) => {
    //lo hice al pedo creo
    const { id } = req.params;
    if (id) {
      try {
        let data = await this.model.findByPk(id);
        console.log(data);
        res.send(data);
      } catch (error) {
        res.send(error);
      }
    } else {
      res.status(400).send({ message: 'Wrong parameters' });
    }
  };
  deleteAddress = async (req, res) => {
    const { id } = req.params;
    if (id) {
      try {
        const deleted = await this.model.destroy({ where: { id: id } });
        if (deleted === 1) {
          res.send('Address deleted');
        } else {
          res.send('Oops, something went wrong');
        }
      } catch (e) {
        res.send(e);
      }
    } else {
      res.json({ error: 'No id in params' });
    }
  };
}

const AddressController = new AddressModel(Address);

module.exports = AddressController;
