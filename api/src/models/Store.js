const { DataTypes } = require('sequelize');
// const { all } = require('sequelize/types/lib/operators');

module.exports = (sequelize) => {
    return sequelize.define(
        'Store',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            storeName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                // unique: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cloudImage: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
            },
            state: {
                type: DataTypes.STRING,
            },
            cp: {
                type: DataTypes.STRING,
            },
            coord: {
                type: DataTypes.JSON,
            },
            paymentAccount: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
