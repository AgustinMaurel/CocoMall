const { Review } = require('../models/index')
const ModelController = require('./index')

class UserModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const ReviewController = new UserModel(Review)

module.exports = ReviewController