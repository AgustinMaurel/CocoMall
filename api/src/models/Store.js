const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Store', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    store_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
    },
    // payment_account: {
    //PENDING
    // }
  });
};
