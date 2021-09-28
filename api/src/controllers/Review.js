const { Review } = require('../models/index')
const ModelController = require('./index')

class ReviewModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
}

const ReviewController = new ReviewModel(Review)

module.exports = ReviewController