const express = require("express");
const { check } = require("express-validator");

const { userControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");

const router = express.Router();

router.get("/", userControllers.getAllUsers);

router.post('/signup', 
[
    check('name').not().isEmpty(),
    check('password').not().isEmpty(),
    check('email').normalizeEmail().isEmail()
],
userControllers.signupUser);

router.post('/login', userControllers.loginUser);

router.get("/:uid", userControllers.getUserByID);

// router.use(check_auth);

//protected
// router.patch('/',);

//protected
// router.delete('/',);

module.exports = router;
