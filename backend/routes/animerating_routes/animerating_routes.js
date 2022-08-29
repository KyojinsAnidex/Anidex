const express = require("express");
const { check } = require("express-validator");

const { animeRatingControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");
const fileUpload = require("../../middlewares/file_upload");

const router = express.Router();

router.get("/:aid", animeRatingControllers.getAnimeAllRating);

router.get("/user/:uid", animeRatingControllers.getUserAllRating);

router.post(
  "/anime/:uid",
  [check(["animeid"]).not().isEmpty()],
  animeRatingControllers.getAnimeRatingByUser
);

router.use(check_auth);

router.post(
  "/:uid",
  [
    check(["animeid", "starcount"]).not().isEmpty(),
    check(["animeid", "starcount"]).isNumeric(),
  ],
  animeRatingControllers.addRatingByUser
);

module.exports = router;
