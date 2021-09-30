const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{   
    return sequelize.define(
        'Product',{
            id:{
                type:DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull:false,
                primaryKey:true      
            },
     
            ProductName:{
                type:DataTypes.STRING,   
                allowNull:false,
            },
            Price:{
                type:DataTypes.STRING,
                allowNull:false,
            },
            Stock:{
                type:DataTypes.INTEGER,
                allowNull:false,
            },
            Unity:{
                type:DataTypes.INTEGER,       
                allowNull:false,
            },
            Description:{
                type:DataTypes.STRING,
                allowNull:false,
            },
            Image:{
                type:DataTypes.INTEGER,    
                allowNull:false,

            }
        }
    )

}