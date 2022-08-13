const { validationResult } = require("express-validator");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

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

const addRatingByUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs provided, please check your inputs", 422)
    );
  }
  const userid = req.params.uid;
  const { animeid, starcount } = req.body;

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

  if (existingEntry.rowCount != 0) {
    let updatedAnimeRating;
    let queryText;
    queryText =
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
    try {
      updatedAnimeRating = await db.query(queryText);
    } catch (err) {
      return next(
        new HttpError(
          "Updating rating of anime failed, please try again later",
          500
        )
      );
    }

    if (updatedAnimeRating === false) {
      return next(
        new HttpError(
          "Updating rating of anime failed, please try again later",
          500
        )
      );
    }

    if (updatedAnimeRating.rowCount === 0) {
      return next(
        new HttpError(
          "Updating rating of anime failed, please try again later",
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
      newRating: updatedAnimeRating.rows[0],
    });
  } else {
    let createdAnimeRating;
    let queryText;
    queryText =
      "INSERT INTO " +
      dbModels.tables.animestars +
      " VALUES ( '" +
      userid +
      "', " +
      animeid +
      ", " +
      starcount +
      " ) RETURNING * ;";
    try {
      createdAnimeRating = await db.query(queryText);
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
  }
};

module.exports = {
  getAnimeAllRating,
  getUserAllRating,
  addRatingByUser,
};
