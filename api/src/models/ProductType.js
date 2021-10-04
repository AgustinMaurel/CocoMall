const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'ProductType',
        {
            Name: {
                type: DataTypes.STRING,
                allowNuull: false,
                unique: true,
            },
            NameEs: {
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
