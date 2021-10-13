const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subCategory:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Others"
        },
        sellBy: {
            type: DataTypes.ENUM('Cuantity', 'Weight', 'Volume', 'Length'),
            allowNull: false,
            defaultValue: 'Cuantity',
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cloudImage: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
    });
};