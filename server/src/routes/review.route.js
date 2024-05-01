const express = require("express");
const { body } = require("express-validator");
const reviewController = require("../controllers/review.controller");
const tokenMiddleware = require("../middlewares/token.middleware.js");
const requestHandler = require("../handlers/request.handler.js");

const router = express.Router({ mergeParams: true });

router.get("/", tokenMiddleware.auth, reviewController.getReviewsOfUser);

router.post(
  "/",
  body("mediaId")
    .exists()
    .withMessage("Media_id is required")
    .isLength({ min: 1 })
    .withMessage("Media_id cannot be empty"),

  body("content").exists().withMessage("Content is required"),

  body("mediaType")
    .exists()
    .withMessage("Media type is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("Media type is invalid"),

  body("mediaTitle").exists().withMessage("Media title is required in params"),

  body("mediaPoster")
    .exists()
    .withMessage("Media poster is required in params"),

  requestHandler.validate,
  reviewController.create
);


router.delete(
    "/:reviewId",
    tokenMiddleware.auth,
    reviewController.remove
)

module.exports = {
  router,
};
