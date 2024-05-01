const responseHandler = require("../handlers/response.handler");
const tmdbApi = require("../tmdb/tmdb.api");
const UserModel = require("../models/user.model").UserModel;
const FavouriteModel = require("../models/favourite.model").FavouriteModel;
const ReviewModel = require("../models/review.model").ReviewModel;
const { tokenDecode } = require("../middlewares/token.middleware");

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });
    if (!response) return responseHandler.error(res);
    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenre = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const response = await tmdbApi.mediaGenre({ mediaType });
    if (!response) return responseHandler.badrequest(res);
    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;
    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });
    if (!response) return responseHandler.notfound(res);
    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };
    const media = await tmdbApi.mediaDetail(params);
    media.credits = await tmdbApi.mediaCredits(params);
    const videos = await tmdbApi.mediaVideos(params);
    media.videos = videos;
    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;
    media.images = tmdbApi.mediaImages(params);
    const tokenDecoded = tokenDecode(res);
    if (tokenDecoded) {
      const user = await UserModel.findById(tokenDecoded.data);
      if (user) {
        const isFavourite = FavouriteModel.findOne({ user: user.id, mediaId });
        media.isFavourite = isFavourite !== null;
      }
    }
    media.reviews = await ReviewModel.find({ mediaId })
      .populate("user")
      .sort("-createdAt");
    responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};

module.exports = {
    getList,
    getGenre,
    search,
    getDetail
}