const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Product_Type",
        {
            ProductTypeName: {
                type: DataType.STRING,
                allowNuull: false,
                unique: true,
            },
        },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
