const { Sequelize } = require("sequelize");

//Factory models
const UsersFactory = require ('./User');
// store
// address
// products
// orders
// review
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
// store
// address
// products
// orders
// review
// product type
 


module.exports = {
    db: sequelize,
    User
}