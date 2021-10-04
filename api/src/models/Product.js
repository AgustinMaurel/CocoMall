const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define(
        'Product',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            product: {
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
            sellBy: {
                type: DataTypes.ENUM('Cuantity', 'Weight', 'Volume', 'Length'),
                allowNull: false,
                defaultValue: 'Cuantity',
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cloudImage: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
