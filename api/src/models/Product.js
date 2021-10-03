const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        'Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        ProductName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        SellBy: {
            type: DataTypes.ENUM("Cuantity", "Weight", "Volume", "Length"),
            allowNull: false,
            defaultValue: "Cuantity"
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Image: {
            // type:DataTypes.BLOB,    
            type: DataTypes.STRING,
            // allowNull:false,
        }
    },
        {
            timestamps: false,
            createdAt: false,
        }
    )

}