const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'User', {
        id: {
            type: DataTypes.UUID,
            allowNuull: false,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNuull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNuull: false
        },
        Mail: {
            type: DataTypes.STRING,
            allowNuull: false
        },
    },
        {
            timestamps: false,
            createdAt: false,
        }
    );
}