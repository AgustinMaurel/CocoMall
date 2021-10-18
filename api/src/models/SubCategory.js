const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'SubCategory',
        {
            Name: {
                type: DataTypes.STRING,
                allowNuull: false,
                unique: true,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};