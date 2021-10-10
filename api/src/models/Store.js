const { DataTypes } = require('sequelize');

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
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cloudImage: {
                type: DataTypes.STRING,
                // allowNull: false,
                defaultValue: "xlcr4ayyxwyorfxmafcu"
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
            // payment_account: {
            //PENDING
            // }
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
