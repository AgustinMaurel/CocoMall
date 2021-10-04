const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
<<<<<<< HEAD
        'User', {
        id: {
            type: DataTypes.STRING,
           /*  defaultValue: DataTypes.UUIDV4, */
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        Mail: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
                notEmpty: true,
                notNull: false
=======
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
                allowNull: false,
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
>>>>>>> bb7fc35f2153389cb5d1179585885c9f768be307
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
