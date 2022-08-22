const { validationResult } = require("express-validator");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");
const check_userid = require("../../middlewares/check_userid");
const check_episodeid = require("../../middlewares/check_episodeid");

const common = require("../common_controllers/common");

const getEpisodeAllRating = async (req, res, next) => {
  let allEpisodes;
  const episodeid = req.params.episodeid;

  let queryText =
    "SELECT * FROM " +
    dbModels.tables.episoderates +
    " WHERE " +
    dbModels.episoderates.episodeidNOTNULL +
    " = " +
    episodeid +
    " ;";
  try {
    allEpisodes = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Fetching all rates of this episode failed, please try again later.",
        500
      )
    );
  }
  if (allEpisodes === false) {
    return next(
      new HttpError(
        "Fetching all rates of this episode failed, please try again later.",
        500
      )
    );
  }

  if (allEpisodes.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "No rates for this episode were found",
    });
  } else {
    res.status(200).json({
      success: true,
      episodeRates: allEpisodes.rows,
    });
  }
};

const getUserAllRating = async (req, res, next) => {
  let allRates;
  const userid = req.params.uid;

  let queryText =
    "SELECT * FROM " +
    dbModels.tables.episoderates +
    " WHERE " +
    dbModels.episoderates.userIDNOTNULL +
    " = '" +
    userid +
    "' ;";
  try {
    allRates = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Fetching all rates by this user failed, please try again later.",
        500
      )
    );
  }
  if (allRates === false) {
    return next(
      new HttpError(
        "Fetching all rates by this user failed, please try again later.",
        500
      )
    );
  }

  if (allRates.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "No rates by this user found",
    });
  } else {
    res.status(200).json({
      success: true,
      allRatesByThisUser: allRates.rows,
    });
  }
};

const addRatingByUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs provided, please check your inputs", 422)
    );
  }
  const userid = req.params.uid;
  const { episodeid, rating } = req.body;

  let useridState = await check_userid(userid);
  let episodeidState = await check_episodeid(episodeid);

  if (episodeidState === 0 || useridState === 0) {
    return next(
      new HttpError(
        "Invalid episodeid or userid inputs provided, please check your inputs",
        422,
        false
      )
    );
  } else if (episodeidState === 2 || useridState === 2) {
    return next(
      new HttpError(
        "Adding rating to episode failed, please try again later",
        500,
        false
      )
    );
  }

  let existingEntry;
  try {
    existingEntry = await db.query(
      "SELECT * FROM " +
        dbModels.tables.episoderates +
        " WHERE " +
        dbModels.episoderates.episodeidNOTNULL +
        " = $1 AND " +
        dbModels.episoderates.userIDNOTNULL +
        " = $2 ;",
      [episodeid, userid]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Adding rating to episode failed, please try again later",
        500
      )
    );
  }
  if (existingEntry === false) {
    return next(
      new HttpError(
        "Adding rating to episode failed, please try again later",
        500
      )
    );
  }
  let createdEpisodeRating = false,
    queryText = "";

  if (existingEntry.rowCount != 0) {
    queryText =
      "UPDATE " +
      dbModels.tables.episoderates +
      " SET " +
      dbModels.episoderates.ratingNOTNULL +
      " = " +
      rating +
      " WHERE " +
      dbModels.episoderates.episodeidNOTNULL +
      " = " +
      episodeid +
      " AND " +
      dbModels.episoderates.userIDNOTNULL +
      " = '" +
      userid +
      "' RETURNING * ;";
  } else {
    queryText =
      "INSERT INTO " +
      dbModels.tables.episoderates +
      " VALUES ( '" +
      userid +
      "', " +
      episodeid +
      ", " +
      rating +
      " ) RETURNING * ;";
  }
  try {
    createdEpisodeRating = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Adding rating to episode failed, please try again later",
        500
      )
    );
  }

  if (createdEpisodeRating === false || createdEpisodeRating.rowCount === 0) {
    return next(
      new HttpError(
        "Adding rating to episode failed, please try again later",
        500
      )
    );
  }

  res.status(201).json({
    success: true,
    newRating: createdEpisodeRating.rows[0],
  });
};

module.exports = {
  getEpisodeAllRating,
  getUserAllRating,
  addRatingByUser,
};
