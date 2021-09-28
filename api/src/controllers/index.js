class ModelController {
    constructor(model) {
        this.model = model;
    }
    //general Functions    
    createData = (req, res) => {
        let data = req.body;
        this.model.create(data).
            then((data) => {
                res.send(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    findDataId = (req, res) => {
        this.model.findById(req.params.id).
            then((data) => {
                res.send(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteDataById = (req, res) => {
        this.model.deleteById(req.params.id).
            then((data) => {
                res.status(200).json({
                    message: `${data}deleted successfully`,
                    data,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateData = (req, res) => {
        this.model.updateData(req.body, req.params.id).
            then((data) => {
                res.status(200).json({
                    message: "Gig updated successfully",
                    data,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    findData = (req, res) => {
        this.model.findAll().
            then((data) => {
                res.send(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = ModelController