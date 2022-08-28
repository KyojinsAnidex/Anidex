const express = require("express");
const { check } = require("express-validator");

const { episodesControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");
const fileUpload = require("../../middlewares/file_upload");

const router = express.Router();

router.get("/:aid", episodesControllers.getAllEpisodes);

router.get("/single/:episodeid", episodesControllers.getSingleEpisode);

router.use(check_auth);

router.post(
  "/:aid",
  [
    check(["episode", "season", "animeid", "airingdate", "runtime"])
      .not()
      .isEmpty(),
    check(["episode", "season", "animeid"]).isNumeric(),
  ],
  episodesControllers.addEpisode
);

module.exports = router;
