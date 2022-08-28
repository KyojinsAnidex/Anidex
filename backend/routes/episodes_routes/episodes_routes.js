const express = require("express");
const { check } = require("express-validator");

const { episodesControllers } = require("../../controllers/index");
const check_admin = require("../../middlewares/check_admin");
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

router.use(check_admin);
router.delete("/single/:episodeid", episodesControllers.deleteEpisode);

module.exports = router;
