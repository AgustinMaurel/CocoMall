const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qualification: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
    }
  });
};
