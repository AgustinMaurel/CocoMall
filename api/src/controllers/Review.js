const { Review, Order } = require('../models/index');
const ModelController = require('./index');

class ReviewModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createReview = async (req, res) => {
        // Id of the order
        const { orderId } = req.body
        // Id of the store
        const { storeId } = req.params
        // Id of the user
        const { userId } = req.body
        if (id) {
            try {
                const review = req.body // obj con description{string} y qualification{ENUM 1 2 3 4 5}
                //Create the review
                const newReview = await this.model.create(review);
                const reviewId = newReview.id;
                //Search the order and attach the Review
                const order = await Order.findByPk(orderId);
                await order.addReview(reviewId);
                //Search the store and attach the Review

                //Search the user and attach the Review
                
                res.send(newReview);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.status(400).send({ message: 'No id' });
        }
    };
}

const ReviewController = new ReviewModel(Review);

module.exports = ReviewController;
