class ModelController {
    constructor(model) {
        this.model = model;
    }
    //general Functions
    createData = async (req, res) => {
        const data = req.body;
        if (typeof data === 'object') {
            try {
                let createdDaata = await this.model.create(data);
                res.send(createdDaata);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    findDataId = async (req, res) => {
        if (req.params.id) {
            try {
                let id = req.params.id;
                let data = await this.model.findById(id);
                res.send(data);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
        return await this.model.findById(id);
    };

    deleteDataById = async (req, res) => {
        if (req.params.id) {
            try {
                let id = req.params.id;
                let deletedData = await this.model.deleteById(id);
                res.send(deletedData);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    updateData = async (req, res) => {
        if (typeof req.body === 'object') {
            try {
                let data = req.body;
                let id = req.params.id;
                let updatedData = await this.model.updateData(data, id);
                res.send(updatedData);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    getAllData = async (req, res) => {
        try {
            let data = await this.model.findAll()     
            res.send(data);
        } catch (error) {
            res.send(error)
        }

    };
}

module.exports = ModelController;
