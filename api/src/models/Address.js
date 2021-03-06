const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Address',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            directions: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cords: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            // choose:{
            //     type: DataTypes.BOOLEAN,
            //     allowNull: false,
            //     defaultValue: false
            // }
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};