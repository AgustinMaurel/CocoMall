const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Store', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    qualification: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
    }
  });
};
