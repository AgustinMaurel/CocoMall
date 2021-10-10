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
            payment: {
                type: DataTypes.STRING,
                // PENDIENTE
            },
            orderState: {
                type: DataTypes.ENUM(
                    'Pending',
                    'Rejected',
                    'Shipped',
                    'Completed'
                ),
                allowNull: false,
                defaultValue: 'Pending',
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
