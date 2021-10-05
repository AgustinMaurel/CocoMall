const { Sequelize } = require('sequelize');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
} = require('../utils/config/index');

//Factory models

const UserFactory = require('./User.js');
const StoreFactory = require('./Store.js');
const AddressFactory = require('./Address.js');
const ProductFactory = require('./Product.js');
const OrderFactory = require('./Order.js');
const ReviewFactory = require('./Review.js');
const ProductTypeFactory = require('./ProductType.js');

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
const Address = AddressFactory(sequelize);
const Product = ProductFactory(sequelize);
const Order = OrderFactory(sequelize);
const Review = ReviewFactory(sequelize);
const ProductType = ProductTypeFactory(sequelize);

//Conection between tables

User.hasMany(Address, { foreignKey: { id: 'myUsersid' } });
Address.belongsTo(User);

// //---------------------------------

User.hasMany(Store, { foreignKey: { id: 'myUserid' } });
Store.belongsTo(User);

// //---------------------------------

User.hasMany(Order, { foreignKey: { id: 'myUserid' } });
Order.belongsTo(User);

// //---------------------------------

Address.hasMany(Order, { foreignKey: { id: 'myAddressid' } });
Order.belongsTo(Address);

// //---------------------------------

Order.hasOne(Review, { foreignKey: { id: 'myOrderid' } });
Review.belongsTo(Order);

// //---------------------------------

Store.hasMany(Order, { foreignKey: { id: 'myStoreid' } });
Order.belongsTo(Store);

// //---------------------------------

Store.hasMany(Product, { foreignKey: { id: 'myStoreid' } });
Product.belongsTo(Store);

// //---------------------------------

ProductType.hasMany(Product, { foreignKey: { id: 'myTypeid' } });
Product.belongsTo(ProductType);

// //---------------------------------

Product.belongsToMany(Order, { through: 'ordersProduct' });
Order.belongsToMany(Product, { through: 'ordersProduct' });

module.exports = {
    db: sequelize,
    User,
    Store,
    Address,
    Product,
    Order,
    Review,
    ProductType,
};
