const { ProductType } = require('../models/index');
const ModelController = require('./index');

class ProducTypeModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    postBulkCreate = async (req, res) => {
        const allTypes = req.body.types;
        if (typeof allTypes === 'object') {
            try {
                let data = await this.model.bulkCreate(allTypes);
                res.send(data);
            } catch (error) {
                res.send(error);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    filterTypes = (req, res) => {
        const { allTypes } = req.body
        if(allTypes){
            try {
                const allTypesOfStore = this.model.findAll({
                    where: {
                        id: {
                            [Op.or]: allTypes
                        }
                    }
                })
                res.send(allTypesOfStore)
            } catch (error) {
                res.send(error)
            }
        } else {
            res.send("Wrong parameters")
        }
    }
}

const ProductTypeController = new ProducTypeModel(ProductType);

module.exports = ProductTypeController;
