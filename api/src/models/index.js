const { Sequelize } = require('sequelize');
const Stripe = require('stripe');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    PUBLIC_KEY,
    SECRET_KEY,
} = require('../utils/config/index');

//Stripe
const stripe = new Stripe(SECRET_KEY);

//Factory models

const UserFactory = require('./User.js');
const StoreFactory = require('./Store.js');
const AddressFactory = require('./Address.js');
const ProductFactory = require('./Product.js');
const OrderFactory = require('./Order.js');
const ReviewFactory = require('./Review.js');
const ProductTypeFactory = require('./ProductType.js');
const QuestionFactory = require('./Question.js');
const CartFactory = require('./Cart');
const ItemFactory = require('./items');

//Sequalize

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
const Question = QuestionFactory(sequelize);
const Cart = CartFactory(sequelize);
const Item = ItemFactory(sequelize);

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

// //---------------------------------

Product.hasMany(Question, { foreignKey: { id: 'myProductid' } });
Question.belongsTo(Product);

// //----------------------------------
User.hasOne(Cart, { foreignKey: { id: 'myUserId' } });
Cart.belongsTo(User);
// //----------------------------------
Cart.hasMany(Item, { foreignKey: { id: 'myItemId' } });
Item.belongsTo(Cart);
// //----------------------------------
Product.hasMany(Item, { foreignKey: { id: 'myItemId' } });
Item.belongsTo(Product);

module.exports = {
    db: sequelize,
    User,
    Store,
    Address,
    Product,
    Order,
    Review,
    ProductType,
    Question,
    stripe,
    Cart,
    Item,
};
