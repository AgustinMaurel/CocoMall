const { Store, User, Product } = require('../models/index');
const ModelController = require('./index');
const { cloudinary } = require('../utils/cloudinary/index');
const { Op } = require('sequelize');

class StoreModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createStore = async (req, res) => {
        
        if (req.body.idUser) {
            try {
                //Cloudinary
                const fileString = req.body.idImage
                    ? req.body.idImage
                    : 'No image base64 string';
                const uploadedResponse = await cloudinary.uploader.upload(
                    fileString
                );
                let public_id = uploadedResponse.public_id;

                //Our DataBase

                const id = req.body.idUser
                console.log(id)
                const store = {
                    storeName: req.body.store.storeName
                        ? req.body.store.storeName
                        : null,
                    address: req.body.store.address
                        ? req.body.store.address
                        : null,
                    description: req.body.store.description
                        ? req.body.store.description
                        : null,
                    country: req.body.store.country
                        ? req.body.store.country
                        : null,
                    cp: req.body.store.cp ? req.body.store.cp : null,
                    state: req.body.store.state ? req.body.store.state : null,
                    cloudImage: public_id ? public_id : 'No image id',
                };
                console.log(store)
                //create the new Store
                const newStore = await this.model.create(store);
                const storeId = newStore.id;

                //Attach the Store with the User ID
                
                const user = await User.findByPk(id);
                
                await user.addStore(storeId);

                // Final Store
                const finalStore = await this.model.findByPk(storeId);
                
                res.send(finalStore);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    getAllData = async (req, res, next) => {
        try {
            //Cloudinary
            // const {resources} = await cloudinary.search.expression('folder:dev_setups')
            // .sort_by('public_id', 'desc').execute()
            // // .max_results(...)
            // const {publicIds} = resources.map(file => file.public_id) // array con todas las public ids

            // Our DataBase

            let data = await Store.findAll({
                include: [{model: Product}]
            });
            res.send(data);
        } catch (e) {
            next(e);
        }
    };

    postBulkCreate = async (req, res) => {
        const allStore = req.body.Store;
        const allId = req.body.Ids;
        if (typeof allStore === 'object') {
            try {
                let stores = await this.model.bulkCreate(allStore);
                stores.forEach(async (store, i) => {
                    //Get the id of each store
                    const storeId = store.id;
                    //Attach the Store with the User ID
                    const user = await User.findByPk(allId[i]);
                    await user.addStore(storeId);
                });
                //lindo msj
                res.send('Successfully Created');
            } catch (error) {
                res.send(error);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };

    filterStoresByProductTypes = async (req, res) => {
        const typesId = req.body.types || [];
        const nameToFilter = req.body.name || '';
        const min = req.body.min || 0;
        const max = req.body.max || 99 ^ 9999;
        try {
            const filteredStores = await this.model.findAll({
                include: {
                    model: Product,
                    attributes: ['ProductTypeId', 'productName', 'price'],
                    where: {
                        ProductTypeId: {
                            [Op.or]: typesId,
                        },
                        productName: {
                            [Op.iLike]: `%${nameToFilter}%`,
                        },
                        price: {
                            [Op.and]: {
                                [Op.gte]: min,
                                [Op.lte]: max,
                            },
                        },
                    },
                },
            });
            res.send(filteredStores);
        } catch (error) {
            res.send(error);
        }
    };


    
    findStoresOfUser = async (req, res) => {
        const id = req.params.userId ? req.params.userId : null ;
        if (id) {
            try {
                let userStores = await this.model.findAll({
                    where: {
                        UserId: id,
                    },
                });
                res.send(userStores);
            } catch (error) {
                res.send(error);
            }
        } else {
            res.status(400).send({ message: 'Must have an User Id' });
        }
    };

}

const StoreController = new StoreModel(Store);

module.exports = StoreController;
