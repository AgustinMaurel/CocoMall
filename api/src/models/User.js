const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.STRING,
                /*  defaultValue: DataTypes.UUIDV4, */
                allowNull: false,
                primaryKey: true,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            LastName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            Mail: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true,
                    notEmpty: true,
                    notNull: false,
                },
                allowNull: false,
                unique: true,
            },
            Cart: {
                type: DataTypes.ARRAY(DataTypes.JSON),
                defaultValue: [],
                allowNull: false,
            },
            Remember: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            }
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
