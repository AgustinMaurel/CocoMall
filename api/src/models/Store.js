const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Store', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    storeName: {
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
  },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
