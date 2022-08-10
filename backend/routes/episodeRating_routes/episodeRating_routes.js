const express = require("express");
const { check } = require("express-validator");

const { episodeRatingControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");
const fileUpload = require("../../middlewares/file_upload");

const router = express.Router();

router.get("/:episodeid", episodeRatingControllers.getEpisodeAllRating);

router.get("/user/:uid", episodeRatingControllers.getUserAllRating);

router.use(check_auth);

router.post(
  "/:uid",
  [
    check(["episodeid", "rating"]).not().isEmpty(),
    check(["episodeid", "rating"]).isNumeric(),
  ],
  episodeRatingControllers.addRatingByUser
);

module.exports = router;
