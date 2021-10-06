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
                // console.log(store)
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

            let data = await Store.findAll();
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

    deleteDeep=async(req,res)=>{
        let id = req.params.id;
        if(id){



            try{
                const[ProductDelte,StoreDelte]=await Promise.all([
                    Product.destroy({where:{StoreId:id}}),
                    this.model.destroy({where:{id:id}}),
                ])
                res.json({ProductDelte,
                        StoreDelte})

            }catch(error){
                res.status(400).json(error)
            }
        }else{
            res.status(400).json({
                msg:"faltan datos"
            })
        }
    }


    // UPDATE FUNCIONA PERFECTO --  NO TOCAR MUCHO !
    updateDataStore=async(req,res)=>{
        const id1 = req.params.id;
        const { store } = req.body;

        if(store.cloudImage){
            
            // Borro la imagen en Cloudinary
            let arr = []
            const oldStore = await this.model.findByPk(id1)
            arr.push(oldStore.cloudImage)
            const deletedImage = await cloudinary.api.delete_resources(arr);
            
            // Subo la imagen nueva a Cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(store.cloudImage)
            
            // Guardo el token de la imagen, asi tambien se actualiza
            let public_id = uploadedResponse.public_id;
            store.cloudImage = public_id
        }

        await this.model.update({...store},{where:{
            id:id1    
        }})

        const StoreActualizado = await this.model.findByPk(id1)


        res.json({
            msg:"Store updated",
            StoreActualizado
        })
    }
}
//c

const StoreController = new StoreModel(Store);

module.exports = StoreController;
