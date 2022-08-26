const express = require("express");
const { check } = require("express-validator");

const { personnelControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");
const fileUpload = require("../../middlewares/file_upload");

const router = express.Router();

router.get("/", personnelControllers.getAllPerson);

router.get("/:pid", personnelControllers.getSinglePerson);

router.use(check_auth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check(["firstname", "lastname", "gender", "birthday", "website", "address"])
      .not()
      .isEmpty(),
    check("gender").isIn(["M", "F", "O"]),
  ],
  personnelControllers.addPerson
);

module.exports = router;
