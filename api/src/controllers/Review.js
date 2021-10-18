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
