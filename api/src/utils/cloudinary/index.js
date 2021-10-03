// require('dotenv').config();
const cloudinary = require('cloudinary').v2;

//Creo mi archivo configuracion de cloudinary.

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME || 'coco-mall',
    api_key: process.env.CLOUDINARY_API_KEY || '355153632747981',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'v-R4_J_uizvz2fKHu8VSTP_18vg'
});

module.exports = { cloudinary };