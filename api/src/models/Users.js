const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'user', {
        id: {
            type: DataTypes.UUID,
            allowNuull: false,
            primaryKey: true,
        }
    }
    );
}