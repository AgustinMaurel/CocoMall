require('dotenv').config();

module.exports = {
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || "romilinda0100",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_NAME: process.env.DB_NAME || "cocomall",
    PORT: process.env.PORT || 3001, 
    PUBLIC_KEY: process.env.PUBLIC_KEY || "817375688552717",
    SECRET_KEY: process.env.SECRET_KEY || "NjUQzQzDM-VCFOveydgSOrFE5bE"
}
