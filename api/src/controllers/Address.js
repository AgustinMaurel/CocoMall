const { Address, User } = require('../models/index');
const ModelController = require('./index');

class AddressModel extends ModelController {
  constructor(model) {
    super(model);
  }
    deleteAddress = async (req,res) => {

    }
    
    getAllData = async (req,res) => {
      
    }

    //Specific Functions for this model
    createAddress = async (req, res) => {
        const { id, directions, cords } = req.body;
        if (id) {
            try {
                //id of User

                //Create the Address
                const [newAddress, created] = await this.model.findOrCreate({
                    where: {
                        directions: directions,
                        cords: cords
                    }
                });
                const addressId = newAddress.id;
                //Search the User and attach the Address
                const user = await User.findByPk(id);
                await user.addAddress(addressId);
                
                res.send(newAddress);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    getIdData = async (req, res) => {
        //lo hice al pedo creo
        const {id} = req.params
        if (id) {
            try {
                let data = await this.model.findByPk(id);
                console.log(data)
                res.send(data);
            } catch (error) {
                res.send(error);
            }
        } else {
          res.send('Oops, something went wrong');
        }
      }
} 

const AddressController = new AddressModel(Address);

module.exports = AddressController;
