const express = require("express");
const { check } = require("express-validator");

const { animeControllers } = require("../../controllers/index");
const check_admin = require("../../middlewares/check_admin");
const check_auth = require("../../middlewares/check_auth");
const fileUpload = require("../../middlewares/file_upload");

const router = express.Router();

router.get("/", animeControllers.getAllAnime);

router.get("/pictures/:aid", animeControllers.getAllAnimePictures);

router.get("/items/:aid", animeControllers.getAllAnimeItems);

router.get("/:aid", animeControllers.getAnimeByID);

router.use(check_auth);

//protected
router.post(
  "/",
  fileUpload.single("image"),
  [
    check(["title", "releasedate", "releaseseason", "synopsis"])
      .not()
      .isEmpty(),
    // check(["releaseseason"]).isDate(),
  ],
  // async (req, res, next) => {
  //   console.log(req.body);
  // },
  animeControllers.addAnime
);

// router.patch('/:aid',[], animeControllers.editAnime);

// protected Admin
router.use(check_admin);
router.delete("/:aid", animeControllers.deleteAnime);

module.exports = router;
