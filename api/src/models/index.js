const { Sequelize } = require('sequelize');

//Factory models
const UsersFactory = require('./User');
const StoreFactory = require('./Store.js');
// address
// products
// orders
const ReviewFactory = require('./Review.js');
// product type

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

//Conection with Sequelize
const User = UsersFactory(sequelize);
const Store = UsersFactory(StoreFactory);
// address
// products
// orders
const Review = UsersFactory(ReviewFactory);
// product type

module.exports = {
  db: sequelize,
  User,
  Store,
  // address
  // products
  // orders
  Review,
  // product type
};
