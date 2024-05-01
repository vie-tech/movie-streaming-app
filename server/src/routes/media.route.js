const express = require("express");
const router = express.Router({ mergeParams: true });
const mediaController = require("../controllers/media.controller.js");

router.get("/search", mediaController.search);
router.get("/genres", mediaController.getGenre);
router.get("/detail/:mediaId", mediaController.getDetail);
router.get("/:mediaCategory", mediaController.getList);

module.exports = {
  router,
};
