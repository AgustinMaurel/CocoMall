const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
<<<<<<< HEAD
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
        // unique: false,
      },
      address: {
        type: DataTypes.STRING,
        // unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cloudImage: {
        type: DataTypes.STRING,
        allowNull: false
      },
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
=======
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
                allowNull: false,
            },
            cloudImage: {
                type: DataTypes.STRING,
                allowNull: false,
            },
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
>>>>>>> bb7fc35f2153389cb5d1179585885c9f768be307
};
