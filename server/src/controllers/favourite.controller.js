const responseHandler = require("../handlers/response.handler");
const FavouriteModel = require("../models/favourite.model.js").FavouriteModel;

const addFavourite = async (req, res) => {
  try {
    const isFavourite = await FavouriteModel.findOne({
      user: req.user._id,
      mediaId: req.body.mediaId,
    });
    if (isFavourite) return responseHandler.ok(res, isFavourite);

    const favourite = new FavouriteModel({
      ...req.body,
      user: req.user.id,
    });
    await favourite.save();
    responseHandler.created(res, favourite);
  } catch {
    responseHandler.error(res);
  }
}; 


const removeFavourite = async (req, res) => {
  try {
    const { favouriteId } = req.params;

    const favourite = FavouriteModel.findOne({
      user: req.user.id,
      _id: favouriteId,
    });
    if (!favourite) return responseHandler.notfound(res);
    await favourite.remove();
    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getFavouritesOfUser = async (req, res) => {
  try {
    const favourite = await FavouriteModel.find({
      user: req.user.id,
    }).sort("-createdAt");

    responseHandler.ok(res, favourite)
  } catch {
    responseHandler.error(res)
  }
};


module.exports = {
    addFavourite,
    removeFavourite,
    getFavouritesOfUser,
}