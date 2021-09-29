const { Sequelize } = require('sequelize');
const {DB_USER,DB_PASSWORD,DB_HOST,DB_NAME} = require ('../utils/config/index')

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
const Store = StoreFactory(sequelize);
const Address = AddressFactory(sequelize)
const Product = ProductFactory(sequelize)
const Order = OrderFactory(sequelize)
const Review = ReviewFactory(sequelize);
const ProductType = ProductTypeFactory(sequelize)

//Conection between tables

// User.hasMany(Address, {foreignKey: {id: 'myUserid'}})
// Address.hasOne(User)

// //---------------------------------

// User.hasMany(Store, {foreignKey: {id: 'myUserid'}})
// Store.hasOne(User)

// //---------------------------------

// User.hasMany(Order, {foreignKey: {id: 'myUserid'}})
// Order.hasOne(User)

// //---------------------------------

// Address.hasMany(Order, {foreignKey: {id: 'myAddressid'}})
// Order.hasOne(Address)

// //---------------------------------

// Store.hasMany(Order, {foreignKey: {id: 'myStoreid'}})
// Order.hasOne(Store)

// //---------------------------------

// Store.hasMany(Product, {foreignKey: {id: 'myStoreid'}})
// Product.hasOne(Store)

// //---------------------------------

// ProductType.hasMany(Product, {foreignKey: {id: 'myProductTypeid'}})
// Product.hasOne(ProductType)

// //---------------------------------

// Product.belongsToMany(Order, {through: "orders_product"})
// Order.belongsToMany(Product,{through: "orders_product"})

// //---------------------------------

// Order.hasOne(Review, {foreignKey: {id: 'myOrderid'}})
// Review.hasOne(Order)


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