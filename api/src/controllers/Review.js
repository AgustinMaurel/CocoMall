const { Review, Order, Store, User } = require('../models/index');
const ModelController = require('./index');

class ReviewModel extends ModelController {
  constructor(model) {
    super(model);
  }
  //Specific Functions for this model
  createReview = async (req, res) => {
    const { userId, orderId, storeId } = req.body;
    if (userId) {
      try {
        const { review } = req.body;
        //Create the review
        const newReview = await Review.create(review);
        const reviewId = newReview.id;
        //Search the order and attach the Review
        const order = await Order.findByPk(orderId);
        await order.setReview(reviewId);
        //Search the store and attach the Review
        const store = await Store.findByPk(storeId);
        await store.addReview(reviewId);

        //Store update, prop: rating
        const totalSumQual = await this.model.findAll();
        const posibleQualifications = totalSumQual.length * 5;
        let count = 0
        totalSumQual.forEach(elem => {
            count += Number(elem.qualification)
        });
        let result = (count / posibleQualifications) * 100;
        // 6 ---- 30 ---- 100
        // 6 ---- 21 ----  X
        // x = 21 / 30 * 100 = 72 %
        await Store.update({rating: result}, { where: { id: storeId } });


        //Search the user and attach the Review
        const user = await User.findByPk(userId);
        await user.addReview(reviewId);

        const finalRev = await this.model.findByPk(reviewId);

        res.send(finalRev);
      } catch (e) {
        res.send(e);
      }
    } else {
      res.send({ message: 'Wrong parameters' });
    }
  };

  updateReview = async (req, res) => {
    // Review Id
    const { id } = req.params;

    if (id && req.body.description) {
      try {
        let obj = { description: req.body.description };
        // <------- Qualification?
        const upReview = await this.model.update(
          { ...obj },
          { where: { id: id } }
        );
        res.send('Review updated successfully');
      } catch (e) {
        res.send({ error: e });
      }
    } else {
      res.send('No review id');
    }
  };

  deleteReview = async (req, res) => {
    // Review Id
    const { id } = req.params;
    if (id) {
      try {
        const deletedReview = await this.model.destroy({ where: { id: id } });
        if (deletedReview === 1) {
          res.send('Review deleted');
        } else {
          res.send('Oops, something went wrong');
        }
      } catch (e) {
        res.send({ error: e });
      }
    } else {
      res.send('No id provided');
    }
  };

  getStoreReview = async (req, res) => {
    const { id } = req.params;

    if (id) {
      try {
        const reviews = await this.model.findAll({
          where: { StoreId: id },
          include: [{ model: User, attributes: ['Name'] }],
        });
        if (reviews) res.send(reviews);
        else res.send('No reviews');
      } catch (e) {
        res.json({ error: e });
      }
    } else {
      res.json({ error: 'No Store id provided' });
    }
  };
}

const ReviewController = new ReviewModel(Review);

module.exports = ReviewController;
