const { validationResult } = require("express-validator");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAllReview = async (req, res, next) => {
  const animeid = req.params.aid;

  let reviews;
  try {
    reviews = await db.query(
      "SELECT * FROM " +
        dbModels.tables.review +
        " WHERE " +
        dbModels.review.animeIDNOTNULL +
        " = $1 ;",
      [animeid]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Fetching anime reviews failed, please try again later.",
        500
      )
    );
  }

  if (reviews === false) {
    return next(
      new HttpError(
        "Fetching anime reviews failed, please try again later.",
        500
      )
    );
  }

  if (reviews.rowCount != 0) {
    res.status(200).json({
      success: true,
      reviews: reviews.rows,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No reviews were found for this anime",
    });
  }
};

const getSingleReview = async (req, res, next) => {
  const reviewid = req.params.reviewid;

  let review;
  try {
    review = await db.query(
      "SELECT * FROM " +
        dbModels.tables.review +
        " WHERE " +
        dbModels.review.reviewidNOTNULL +
        " = $1 ;",
      [reviewid]
    );
  } catch (err) {
    return next(
      new HttpError("Fetching the review failed, please try again later.", 500)
    );
  }

  if (review === false) {
    return next(
      new HttpError("Fetching the review failed, please try again later.", 500)
    );
  }

  if (review.rowCount != 0) {
    res.status(200).json({
      success: true,
      review: review.rows[0],
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No review found with provided review id",
    });
  }
};

const addReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs for review were provided, please check your inputs",
        422
      )
    );
  }

  const { content, animeid, userid } = req.body;
  let createdReview;
  try {
    createdReview = await db.query(
      "INSERT INTO " +
        dbModels.tables.review +
        " ( " +
        dbModels.review.contentNOTNULL +
        ", " +
        dbModels.review.animeIDNOTNULL +
        ", " +
        dbModels.review.userIDNOTNULL +
        " ) VALUES ( '" +
        content +
        "', '" +
        animeid +
        "', '" +
        userid +
        "' ) RETURNING * ;"
    );
  } catch (err) {
    return next(
      new HttpError("Creating review failed, please try again later", 500)
    );
  }

  if (createdReview === false) {
    return next(
      new HttpError("Creating review failed, please try again later", 500)
    );
  }

  if (createdReview.rowCount != 0) {
    res.status(201).json({
      success: true,
      newReview: createdReview.rows[0],
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Creating review failed, please try again later.",
    });
  }
};

module.exports = {
  getAllReview,
  getSingleReview,
  addReview,
};
