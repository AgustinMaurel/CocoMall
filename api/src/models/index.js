const { Sequelize } = require("sequelize");

const UsersFactory = require ('./Users')

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);

const User = UsersFactory(sequelize)

module.exports = {
    db: sequelize,
    User
}