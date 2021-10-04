const { Review, Order } = require('../models/index');
const ModelController = require('./index');

class ReviewModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createReview = async (req, res) => {
        if (req.body.id) {
            try {
                //id of order
                const id = req.body.id ? req.body.id : null;
                const review = {
                    description: req.body.description,
                    qualification: req.body.qualification,
                };
                //Create the review
                const newReview = await Review.create(review);
                const reviewId = newReview.id;
                //Search the order and attach the Review
                const order = await Order.findByPk(id);
                await order.addReview(reviewId);
                res.send(newReview);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'Wrong parameters' });
        }
    };
}

const ReviewController = new ReviewModel(Review);

module.exports = ReviewController;
