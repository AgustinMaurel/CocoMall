class ModelController {
    constructor(model) {
        this.model = model;
    }
    //general Functions    
    createData = async (req, res) => {
        if (typeof req.body === 'object') {
            try {
                let data = req.body
                let updatedData = await this.model.create(data)
                res.send(updatedData)
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    }

    findDataId = async (req, res) => {
        if (req.params.id) {
            try {
                let id = req.params.id
                let data = await this.model.findById(id)
                res.send(data)
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
        return await this.model.findById(id)
    }

    deleteDataById = async (req, res) => {
        if (req.params.id) {
            try {
                let id = req.params.id
                let deletedData = await this.model.deleteById(id)
                res.send(deletedData)
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    }

    updateData = async (req, res) => {
        if (typeof req.body === 'object') {
            try {
                let data = req.body
                let id = req.params.id
                let updatedData = await this.model.updateData(data, id)
                res.send(updatedData)
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    }

    getAllData = async (req, res, next) => {
        let data = await this.model.findAll().catch((err) => {
            next(err)
        })
        res.send(data)
    }
}

module.exports = ModelController