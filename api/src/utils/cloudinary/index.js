// require('dotenv').config();
const cloudinary = require('cloudinary').v2;

//Creo mi archivo configuracion de cloudinary.

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME || 'cocomalls',
    api_key: process.env.CLOUDINARY_API_KEY || '817375688552717',
    api_secret:
        process.env.CLOUDINARY_API_SECRET || 'NjUQzQzDM-VCFOveydgSOrFE5bE',
});

module.exports = { cloudinary };
