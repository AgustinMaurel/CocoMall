const { cloudinary } = require('../utils/cloudinary');

const getAllImages = async (req, res) => {
    
    try{
    const {resources} = await cloudinary.search        
        .sort_by('public_id', 'desc')
        .max_results(500)
        .execute()

    const publicIds = resources.map(file => file.public_id)
    res.send(publicIds)
    }catch(err){
        console.log(err)
    }
}

module.exports =  getAllImages