const { Sequelize } = require('sequelize');

//Factory models
const UserFactory = require('./User.js');
const StoreFactory = require('./Store.js');
const AddressFactory = require('./Address.js')
const ProductFactory = require('./Product.js')
const OrderFactory = require('./Order.js')
const ReviewFactory = require('./Review.js');
const ProductTypeFactory = require('./Product_type.js')

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

//Conection with Sequelize
const User = UserFactory(sequelize);
const Store = UsersFactory(StoreFactory);
const Address = UsersFactory(AddressFactory)
const Product = UsersFactory(ProductFactory)
const Order = UsersFactory(OrderFactory)
const Review = UsersFactory(ReviewFactory);
const ProductType = UsersFactory(ProductTypeFactory)

module.exports = {
  db: sequelize,
  User,
  Store,
  Address,
  Product,
  Order,
  Review,
  ProductType
};
