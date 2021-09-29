require('dotenv').config();

module.exports = {
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_NAME: process.env.DB_NAME || 'cocoMall',
    PORT: process.env.PORT || 3001,
}