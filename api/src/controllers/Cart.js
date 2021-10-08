
const { Cart,Product,User,Item} = require('../models/index');
const ModelController = require('./index');

class OrderModel extends ModelController {
    constructor(model) {
        super(model);
    }
    getProducto=async(req,res)=>{
        let user=req.body.userID;
        let carrito=await this.model.findOne({where:{UserId:user}})
        let listado=await Item.findAll({where:{CartId:carrito.id},
            include:[{model:Product}]
        })
        res.json({
            listado
        })
        
    }
    //Specific Functions for this model
    addToCart=async (req,res)=>{
        let idUser=req.body.idUser
        let product= req.body.idProduct;
        let cantidad=req.body.cantidad;
        const [answer,create]= await this.model.findOrCreate({where:{UserId:idUser}});
        const [data,create1]=await Item.findOrCreate({where:{ProductId:product,CartId:answer.id},defaults:{cantidad}})
        console.log(answer.id);
        if(create1){
          await data.setCart(answer.id);
        }else{
           await data.update({cantidad:data.cantidad+cantidad})
        }
        res.json(answer);
    }
    deleteFromCart=async(req,res)=>{
        let user=req.body.userID;
        let product=req.body.producto;
        let cantidad=req.body.cantidad
        let carrito=await this.model.findOne({where:{UserId:user}})
        let item=await Item.findOne({where:{CartId:carrito.id,ProductId:product}})
        console.log(item)
        if(item.cantidad===1||item.cantidad===cantidad){
            await Item.destroy({where:{id:item.id}})
        }else{
            await item.update({cantidad:item.cantidad-cantidad})
        }
        res.json("borrado con exito")
    }
 
    clearCart=async(req,res)=>{
        let user=req.body.userID;
        let carrito=await this.model.findOne({where:{UserId:user}})
        await Item.destroy({where:{CartId:carrito.id}})
        res.json("limpiado")
    }




}

const OrderController = new OrderModel(Cart);

module.exports = OrderController;
