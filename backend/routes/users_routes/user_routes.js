const express = require("express");
const { check } = require("express-validator");

const { userControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");
const fileUpload = require("../../middlewares/file_upload");

const router = express.Router();

router.get("/", userControllers.getAllUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check(["name", "password"]).not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
  ],
  userControllers.signupUser
);

router.post(
  "/login",
  [
    check("name").not().isEmpty(),
    check("password").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    // check("pictureid").not().isEmpty(),
  ],
  userControllers.loginUser
);

router.get("/:uid", userControllers.getUserByID);

// router.use(check_auth);

//protected
// router.patch('/',);

//protected
// router.delete('/',);

module.exports = router;
