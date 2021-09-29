const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
        'User', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Mail: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
                notEmpty: true,
                notNull: false
            },
            allowNull: false,
            unique: true
        },
    },
        {
            timestamps: false,
            createdAt: false,
        }
    );
}