const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'Store',
    {
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
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cloudImage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // img: {
      //   type: DataTypes.BLOB,
      //   allowNull: false,
      //   // defino el getter que lo obtenga y me lo retorne en UTF8
      //   // get() {
      //   //   return this.getDataValue('img').toString('base64');
      //   // },
      // },
      country: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      cp: {
        type: DataTypes.INTEGER,
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
