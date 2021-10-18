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
                    cords,
                };
                //Create the Address
                const newAddress = await this.model.create(address);
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
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };
}

const AddressController = new AddressModel(Address);

module.exports = AddressController;
