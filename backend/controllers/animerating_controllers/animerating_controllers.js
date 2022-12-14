const { validationResult } = require("express-validator");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");
const check_animeid = require("../../utils/check_animeid");
const check_userid = require("../../utils/check_userid");

const common = require("../common_controllers/common");

const getAnimeAllRating = async (req, res, next) => {
  let allAnime;
  const animeid = req.params.aid;

  let queryText =
    "SELECT * FROM " +
    dbModels.tables.animestars +
    " WHERE " +
    dbModels.animestars.animeIDNOTNULL +
    " = " +
    animeid +
    " ;";
  try {
    allAnime = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Fetching all stars of this anime failed, please try again later.",
        500
      )
    );
  }
  if (allAnime === false) {
    return next(
      new HttpError(
        "Fetching all stars of this anime failed, please try again later.",
        500
      )
    );
  }

  if (allAnime.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "No stars for this anime found",
    });
  } else {
    res.status(200).json({
      success: true,
      animeStars: allAnime.rows,
    });
  }
};

const getUserAllRating = async (req, res, next) => {
  let allStars;
  const userid = req.params.uid;

  let queryText =
    "SELECT * FROM " +
    dbModels.tables.animestars +
    " WHERE " +
    dbModels.animestars.userIDNOTNULL +
    " = '" +
    userid +
    "' ;";
  try {
    allStars = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Fetching all stars by this user failed, please try again later.",
        500
      )
    );
  }
  if (allStars === false) {
    return next(
      new HttpError(
        "Fetching all stars by this user failed, please try again later.",
        500
      )
    );
  }

  if (allStars.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "No stars by this user found",
    });
  } else {
    res.status(200).json({
      success: true,
      allStarsByThisUser: allStars.rows,
    });
  }
};

const getAnimeRatingByUser = async (req, res, next) => {
  let star;
  const userid = req.params.uid;
  const { animeid } = req.body;
  let animeidstate = await check_animeid(animeid),
    useridstate = await check_userid(userid);
  if (animeidstate === 0 || useridstate === 0) {
    return next(
      new HttpError(
        "Invalid animeid or userid parameter provided, please check your url",
        422
      )
    );
  } else if (animeidstate === 2|| useridstate === 2) {
    return next(
      new HttpError("Getting rating failed, please try again later", 500)
    );
  }
  let queryText =
    "SELECT * FROM " +
    dbModels.tables.animestars +
    " WHERE " +
    dbModels.animestars.userIDNOTNULL +
    " = '" +
    userid +
    "' AND " +
    dbModels.animestars.animeIDNOTNULL +
    " = '" +
    animeid +
    "' ;";
  try {
    star = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Fetching this anime rating by this user failed, please try again later.",
        500
      )
    );
  }
  if (star === false) {
    return next(
      new HttpError(
        "Fetching this anime rating by this user failed, please try again later.",
        500
      )
    );
  }

  if (star.rowCount === 0) {
    res.status(200).json({
      success: true,
      rating: 0,
    });
  } else {
    res.status(200).json({
      success: true,
      rating: star.rows[0].starcount,
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
  const { animeid, starcount } = req.body;

  let animeidState = await check_animeid(animeid);
  let useridState = await check_userid(userid);

  if (animeidState === 0 || useridState === 0) {
    return next(
      new HttpError(
        "Invalid animeid or userid inputs provided, please check your inputs",
        422
      )
    );
  } else if (animeidState === 2 || useridState === 2) {
    return next(
      new HttpError(
        "Adding rating to anime failed, please try again later",
        500
      )
    );
  }

  let existingEntry;
  try {
    existingEntry = await db.query(
      "SELECT * FROM " +
        dbModels.tables.animestars +
        " WHERE " +
        dbModels.animestars.animeIDNOTNULL +
        " = $1 AND " +
        dbModels.animestars.userIDNOTNULL +
        " = $2 ;",
      [animeid, userid]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Adding rating to anime failed, please try again later",
        500
      )
    );
  }
  if (existingEntry === false) {
    return next(
      new HttpError(
        "Adding rating to anime failed, please try again later",
        500
      )
    );
  }
  let createdAnimeRating = false,
    queryText2 = false;
  if (existingEntry.rowCount != 0) {
    queryText2 =
      "UPDATE " +
      dbModels.tables.animestars +
      " SET " +
      dbModels.animestars.starcountNOTNULL +
      " = " +
      starcount +
      " WHERE " +
      dbModels.animestars.animeIDNOTNULL +
      " = " +
      animeid +
      " AND " +
      dbModels.animestars.userIDNOTNULL +
      " = '" +
      userid +
      "' RETURNING * ;";
  } else {
    queryText2 =
      "INSERT INTO " +
      dbModels.tables.animestars +
      " VALUES ( '" +
      userid +
      "', " +
      animeid +
      ", " +
      starcount +
      " ) RETURNING * ;";
  }
  try {
    createdAnimeRating = await db.query(queryText2);
  } catch (err) {
    return next(
      new HttpError(
        "Adding rating to anime failed, please try again later",
        500
      )
    );
  }

  if (createdAnimeRating === false) {
    return next(
      new HttpError(
        "Adding rating to anime failed, please try again later",
        500
      )
    );
  }

  if (createdAnimeRating.rowCount === 0) {
    return next(
      new HttpError(
        "Adding rating to anime failed, please try again later",
        500
      )
    );
  }
  //update all ratings now
  let updatedState = true;
  try {
    updatedState = await db.query("CALL update_animerank();");
  } catch (error) {
    return next(
      new HttpError(
        "Updating rating of anime failed, please try again later",
        500,
        false
      )
    );
  }

  if (updatedState === false) {
    return next(
      new HttpError(
        "Updating rating of anime failed, please try again later",
        500,
        false
      )
    );
  }

  res.status(201).json({
    success: true,
    newRating: createdAnimeRating.rows[0],
  });
};

module.exports = {
  getAnimeAllRating,
  getUserAllRating,
  addRatingByUser,
  getAnimeRatingByUser,
};
