const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Address',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNuull: false,
                primaryKey: true,
            },

            directions: {
                type: DataTypes.STRING,
                allowNuull: false,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
