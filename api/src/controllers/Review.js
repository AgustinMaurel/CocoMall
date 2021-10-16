const { Review, Order, Store, User } = require('../models/index');
const ModelController = require('./index');

class ReviewModel extends ModelController {
    constructor(model) {
        super(model);
    }
    //Specific Functions for this model
    createReview = async (req, res) => {
        // Id of the order
        const { OrderId } = req.body
        // Id of the store
        const { StoreId } = req.body
        // Id of the user
        const { UserId } = req.body
        if (OrderId) {
            try {
                const { review } = req.body // obj con description{string} y qualification{ENUM 1 2 3 4 5}
                //Create the review
                const newReview = await this.model.create(review);
                const reviewId = newReview.id;
                //Search the order and attach the Review
                const order = await Order.findByPk(OrderId);
                await order.setReview(reviewId);
                //Search the store and attach the Review
                const store = await Store.findByPk(StoreId)
                await store.addReview(reviewId)
                //Search the user and attach the Review
                const user = await User.findByPk(UserId)
                await user.addReview(reviewId)

                const finalReview = await this.model.findByPk(reviewId)

                res.send(finalReview);
            } catch (e) {
                res.send("Error");
            }
        } else {
            res.status(400).send({ message: 'No id' });
        }
    };

    updateReview = async (req,res) => {
        // Review Id
        const { id } = req.params

        if(id && req.body.description){ 
            try{
                let obj = {description: req.body.description}
                // <------- Qualification?
                const upReview = await this.model.update({...obj} , {where: {id: id}})
                res.send("Review updated successfully")
            }catch(e){
                res.send({error: e})
            }
        }else{
            res.send("No review id")
        }
    }

    deleteReview = async (req,res) => {
        // Review Id
        const { id } = req.params
        if(id){
            try{
                const deletedReview = await this.model.destroy({where: {id: id}})
                if (deletedReview === 1) {
                    res.send('Review deleted');
                }else{
                    res.send('Oops, something went wrong');
                }
            }catch(e){
                res.send({error: e})
            }
        }else{
            res.send("No id provided")
        }
    }
}

const ReviewController = new ReviewModel(Review);

module.exports = ReviewController;
