const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Item',
        {
            id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            cantidad:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },


            
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
