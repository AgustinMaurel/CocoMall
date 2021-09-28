const { Sequelize } = require('sequelize');

//Factory models
<<<<<<< HEAD
const UsersFactory = require ('./User');
const OrderFactory = require ('./Order')

=======
const UsersFactory = require('./User');
const StoreFactory = require('./Store.js');
// address
// products
// orders
const ReviewFactory = require('./Review.js');
// product type
>>>>>>> bd43748b94e7adf6e3e162ae67825c891bb13836

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

//Conection with Sequelize
const User = UsersFactory(sequelize);
<<<<<<< HEAD
const Order = OrderFactory(sequelize)


module.exports = {
    db: sequelize,
    User,
    Order,
}
=======
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
>>>>>>> bd43748b94e7adf6e3e162ae67825c891bb13836
