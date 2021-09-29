class ModelController {
    constructor(model) {
        this.model = model;
    }
    //general Functions    
    createData = async (data) => {
        return await this.model.create(data)
    }

    findDataId = async (id) => {
        return await this.model.findById(id)
    }

    deleteDataById = async (id) => {
        return await this.model.deleteById(id)
    }

    updateData = async (data, id) => {
        return await this.model.updateData(data, id)
    }

    getAllData = async (req, res, next) => {
        let data = await this.findAll().catch((err) => {
            next(err)
        })
        res.send(data)
    }
}

module.exports = ModelController