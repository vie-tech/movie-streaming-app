const responseHandler = require("../handlers/response.handler");
const ReviewModel = require("../models/review.model").ReviewModel;

const create = async (req, res) => {
  try {
    const { movieId } = req.params;
    const review = new ReviewModel({
      user: req.user.id,
      movieId,
      ...req.body,
    });

    await review.save();
    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHandler.error(res);
  }
};


const remove = async (req, res)=>{

    try{
        const {reviewId} = req.params
        const review = await ReviewModel.findOne({
            _id: reviewId,
            user: req.user.id
        })

        if(!review) return responseHandler.notfound(res)

        await review.remove()
        responseHandler.ok(res)
    }catch{
        responseHandler.error(res)
    }
}

const getReviewsOfUser = async (req, res) => {
    try{
        const reviews = await ReviewModel.find({
            user: req.user.id
        }).sort('-createdAt')
        responseHandler.ok(res, reviews)
    }catch{
        responseHandler.error(res)
    }
}


module.exports = {
    create,
    remove,
    getReviewsOfUser
}