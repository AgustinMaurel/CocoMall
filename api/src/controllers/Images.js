const { cloudinary } = require('../utils/cloudinary');

const getStoreImages = async (req, res) => {
    try {
        const { resources } = await cloudinary.search
            .expression('folder:Stores')
            .sort_by('public_id', 'desc')
            .max_results(500)
            .execute();

        const publicIds = resources.map((file) => file.public_id);
        res.send(publicIds);
    } catch (err) {
        console.log(err);
    }
};
const getProductImages = async (req, res) => {
    try {
        const { resources } = await cloudinary.search
            .expression('folder:Products')
            .sort_by('public_id', 'desc')
            .max_results(500)
            .execute();

        const publicIds = resources.map((file) => file.public_id);
        res.send(publicIds);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { getStoreImages, getProductImages };
