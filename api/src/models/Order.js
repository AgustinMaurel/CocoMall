const { DataTypes } = require('sequelize');
const { all } = require('sequelize/types/lib/operators');

module.exports = (sequelize) => {
    sequelize.define(
        'Order', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        payment: {
            type: DataTypes.STRING
            // PENDIENTE
        },
        orderState: {
            type: DataTypes.ENUM('Pending', 'Rejected', 'Shipped', 'Completed'),
            allowNull: false,
            defaultValue: 'Pending'
        }
    },
        {
            timestamps: false,
            createdAt: false,
        }
    );
}