const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'User', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            timestamps: false,
            createdAt: false,
        }
    );
}