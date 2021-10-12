const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Order',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            orderState: {
                type: DataTypes.ENUM(
                    'Failure',
                    'Success'
                    /* 'Pending' */
                ),
                allowNull: false,
                /* defaultValue: 'Pending', */
            },
        },
        {
            timestamps: false,
        }
    );
};
