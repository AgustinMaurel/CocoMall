class ModelController {
    constructor(model) {
        this.model = model;
    }
    //general Functions
    createData = async (req, res) => {
        if (typeof req.body === 'object') {
            try {
                let data = req.body;
                let updatedData = await this.model.create(data);
                res.send(updatedData);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.send({ message: 'Wrong parameters' });
        }

        findDataId = async (req, res) => {
            if (req.params.id) {
                try {
                    let id = req.params.id;
                    let data = await this.model.findByPk(id);
                    res.send(data);
                } catch (e) {
                    res.send(e);
                }
            } else {
                res.send({ message: 'Wrong parameters' });
            }
            return await this.model.findByPk(id);
        };

        deleteDataById = async (req, res) => {
            console.log(req.params.id);
            if (req.params.id) {
                try {
                    let id = req.params.id;
                    let deletedData = await this.model.destroy({
                        where: { id: id },
                    });
                    return res.send('se borro correctamente');
                } catch (e) {
                    res.send(e);
                }
            } else {
                res.send({ msg: 'Wrong parameters' });
            }
        };

        updateData = async (req, res) => {
            if (typeof req.body === 'object') {
                try {
                    let { id, ...data } = req.body;
                    let id2 = req.params.id;
                    const updatedData = await this.model.update(
                        { ...data },
                        {
                            where: {
                                id: id2,
                            },
                        }
                    );
                    res.send(updatedData);
                } catch (e) {
                    res.send(e);
                }
            } else {
                res.send({ message: 'Wrong parameters' });
            }
        };

        getAllData = async (req, res) => {
            try {
                let data = await this.model.findAll();
                res.send(data);
            } catch (error) {
                res.send(error);
            }
        };
    };
}
module.exports = ModelController;
