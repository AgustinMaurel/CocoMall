const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "Product_Type",
        {
            ProductTypeName: {
                type: DataTypes.STRING,
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
