const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Cart',
        {
            id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNuull: false,
                primaryKey: true,
            },

            
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
