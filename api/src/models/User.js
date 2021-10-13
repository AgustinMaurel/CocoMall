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
            Country: {
                type: DataTypes.STRING,
                allowNull: false
            },
            State: {
                type: DataTypes.STRING,
                allowNull: false
            },
            SuperAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            Orders: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []
            }
        },
        {   
            timestamps: false,
            createdAt: false,
        }
    );
};
