const express = require("express");
const { check } = require("express-validator");

const { studioControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");
const fileUpload = require("../../middlewares/file_upload");

const router = express.Router();

router.get("/", studioControllers.getAllStudio);

router.get("/:studioname", studioControllers.getSingleStudio);

router.get("/anime/:studioname", studioControllers.getAnimeOfStudio);

router.use(check_auth);

router.post(
  "/",
  [check(["studioname", "office_address", "website"]).not().isEmpty()],
  studioControllers.addStudio
);

module.exports = router;
