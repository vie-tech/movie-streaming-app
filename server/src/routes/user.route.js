const express = require("express");
const { body } = require("express-validator");
const favouriteController = require("../controllers/favourite.controller");
const userController = require("../controllers/user.controller");
const requestHandler = require("../handlers/request.handler");
const UserModel = require("../models/user.model").UserModel;
const tokenMiddleware = require("../middlewares/token.middleware");
const router = express.Router();

router.post(
  "/signup",

  body("username")
    .exists()
    .withMessage("Username is required")
    .isLength({ min: 8 })
    .withMessage("Username minimum of 8 characters")
    .custom(async (value) => {
      const user = await UserModel.findOne({ username: value });
      if (user) return Promise.reject("Username already used");
    }),

  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password minimum of 8 characters"),

  body("confirmPassword")
    .exists()
    .withMessage("Password confirmation is required")
    .isLength({ min: 8 })
    .withMessage("Confirm password minimum of 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Confirm password does not match");
      return true;
    }),

  body("displayName")
    .exists()
    .withMessage("Display name is required")
    .isLength({ min: 8 })
    .withMessage("Display name minimum of 8 characters"),

  requestHandler.validate,
  userController.signup
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("Username is required")
    .isLength({ min: 8 })
    .withMessage("Username minimum of 8 characters"),

  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password minimum of 8 characters"),
  requestHandler.validate,
  userController.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Username minimum of 8 characters"),

  body("newPassword")
    .exists()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("New password minimum of 8 characters"),

  body("confirmNewPassword")
    .exists()
    .withMessage("Confirm ew password is required")
    .isLength({ min: 8 })
    .withMessage("Username minimum of 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error("New passwords don't match");
      return true;
    }),

  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
  "/favourites",
  tokenMiddleware.auth,
  favouriteController.getFavouritesOfUser
);

router.post(
  "/favourites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists()
    .withMessage("Media type is required in params")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("Media type is invalid"),

  body("mediaId")
    .exists()
    .withMessage("MediaId is required")
    .isLength({ min: 8 })
    .withMessage("Media cannot be empty"),

  body("mediaTitle").exists().withMessage("Media title is required in params"),

  body("mediaPoster")
    .exists()
    .withMessage("Media poster is required in params"),

  body("mediaRate").exists().withMessage("Media rate is required in params"),
  requestHandler.validate,
  favouriteController.addFavourite
);

router.delete(
  "/favourites/:favouriteId",
  tokenMiddleware.auth,
  favouriteController.removeFavourite
);

module.exports = { router };
