const express = require("express");
const { check } = require("express-validator");

const { characterControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");
const fileUpload = require("../../middlewares/file_upload");

const router = express.Router();

router.get("/", characterControllers.getAllChar);

router.get("/:cid", characterControllers.getAChar);

router.use(check_auth);

router.post(
  "/",
//   fileUpload.single("image"),
  [
    check("firstname").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("role").not().isEmpty(),
    check("gender").isIn(["M", "F", "O"])
  ],
  characterControllers.addAChar
);


router.patch("/:cid", characterControllers.editAChar);

module.exports = router;
