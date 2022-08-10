const express = require("express");
const { check } = require("express-validator");

const { reviewControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");

const router = express.Router();

router.get("/:aid", reviewControllers.getAllReview);

router.get("/single/:reviewid", reviewControllers.getSingleReview);

router.use(check_auth);

router.post(
  "/:aid",
  [
    check("content").not().isEmpty(),
    check("userid").not().isEmpty(),
    check("animeid").not().isEmpty(),
    check("animeid").isNumeric(),
  ],
  reviewControllers.addReview
);

module.exports = router;
