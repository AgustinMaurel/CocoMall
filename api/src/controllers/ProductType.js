const { ProductType } = require('../models/index')
const ModelController = require('./index')

class ProducTypeModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    postBulkCreate = async (req,res) => {
        const allTypes = req.body.types;
        try {
            let data = await this.model.bulkCreate(allTypes)
            res.send({message: 'successfully created', data})
        } catch (error) {
            res.send(error);
            // console.log(error)
        }
    }
}

const ProductTypeController = new ProducTypeModel(ProductType)

module.exports = ProductTypeController