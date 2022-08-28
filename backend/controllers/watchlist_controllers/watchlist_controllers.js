const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const common = require("../common_controllers/common");
const check_userid = require("../../middlewares/check_userid");
const check_animeid = require("../../middlewares/check_animeid");

const {
  tables,
  anime,
  watchlist,
  users,
  animestars,
} = require("../../models/db_models");

const getWatchlistOfUser = async (req, res, next) => {
  const userID = req.params.uid;

  let userWatchlist = false,
    userFavouriteWatchlist = false;

  let queryText =
    "SELECT " +
    watchlist.animeIDNOTNULL +
    ", " +
    watchlist.favouriteNOTNULL +
    " FROM " +
    tables.watchlist +
    " WHERE " +
    watchlist.userIDNOTNULL +
    " = $1 ;";
  let queryText2 =
    "SELECT " +
    watchlist.animeIDNOTNULL +
    ", " +
    watchlist.favouriteNOTNULL +
    " FROM " +
    tables.watchlist +
    " WHERE " +
    watchlist.userIDNOTNULL +
    " = $1 AND " +
    watchlist.favouriteNOTNULL +
    " = true ;";
  try {
    userWatchlist = await db.query(queryText, [userID]);
    userFavouriteWatchlist = await db.query(queryText2, [userID]);
  } catch (err) {
    return next(
      new HttpError("Fetching watchlist failed, please try again later.", 500)
    );
  }

  if (userWatchlist === false || userFavouriteWatchlist === false) {
    return next(
      new HttpError("Fetching watchlist failed, please try again later.", 500)
    );
  }

  if (userWatchlist.rowCount != 0) {
    res.status(200).json({
      success: true,
      watchlist_anime: userWatchlist.rows,
      watchlist_favourite: userFavouriteWatchlist.rows,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "watchlist empty with provided userID",
    });
  }
  d;
};

const addAnimeToWatchlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs provided, please check your inputs", 422)
    );
  }
  const userid = req.params.uid;
  const { animeid, favourite, rating } = req.body;

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
        "Adding anime to watchlist failed, please try again later",
        500
      )
    );
  }

  let existingEntry1 = false,
    createdAnimeRating = false;

  try {
    existingEntry1 = await db.query(
      "SELECT * FROM " +
        tables.animestars +
        " WHERE " +
        animestars.animeIDNOTNULL +
        " = $1 AND " +
        animestars.userIDNOTNULL +
        " = $2 ;",
      [animeid, userid]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Adding rating to anime failed, please try again later 1",
        500
      )
    );
  }
  if (existingEntry1 === false) {
    return next(
      new HttpError(
        "Adding rating to anime failed, please try again later 2",
        500
      )
    );
  }

  let queryText2;
  if (!isNaN(parseFloat(rating)) && !isNaN(rating - 0)) {
    if (existingEntry1.rowCount != 0) {
      queryText2 =
        "UPDATE " +
        tables.animestars +
        " SET " +
        animestars.starcountNOTNULL +
        " = " +
        rating +
        " WHERE " +
        animestars.animeIDNOTNULL +
        " = " +
        animeid +
        " AND " +
        animestars.userIDNOTNULL +
        " = '" +
        userid +
        "' RETURNING * ;";
    } else {
      queryText2 =
        "INSERT INTO " +
        tables.animestars +
        " VALUES ( '" +
        userid +
        "', " +
        animeid +
        ", " +
        rating +
        " ) RETURNING * ;";
    }

    try {
      createdAnimeRating = await db.query(queryText2);
    } catch (err) {
      return next(
        new HttpError(
          "Adding rating to anime failed, please try again later 3",
          500
        )
      );
    }

    if (createdAnimeRating === false || createdAnimeRating.rowCount === 0) {
      return next(
        new HttpError(
          "Adding rating to anime failed, please try again later 3",
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
  }

  let existingEntry;
  try {
    existingEntry = await db.query(
      "SELECT * FROM " +
        tables.watchlist +
        " WHERE " +
        watchlist.animeIDNOTNULL +
        " = $1 AND " +
        watchlist.userIDNOTNULL +
        " = $2 ;",
      [animeid, userid]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Adding entry to watchlist failed, please try again later",
        500
      )
    );
  }
  if (existingEntry === false) {
    return next(
      new HttpError(
        "Adding entry to watchlist failed, please try again later",
        500
      )
    );
  }

  let queryText3;

  if (existingEntry.rowCount != 0) {
    queryText3 =
      "UPDATE " +
      tables.watchlist +
      " SET " +
      watchlist.favouriteNOTNULL +
      " = " +
      favourite +
      " WHERE " +
      watchlist.animeIDNOTNULL +
      " = " +
      animeid +
      " AND " +
      watchlist.userIDNOTNULL +
      " = '" +
      userid +
      "' RETURNING * ;";
  } else {
    queryText3 =
      "INSERT INTO " +
      tables.watchlist +
      " VALUES ( '" +
      userid +
      "', " +
      favourite +
      ", " +
      animeid +
      " ) RETURNING * ;";
  }
  let createdEntry;

  try {
    createdEntry = await db.query(queryText3);
  } catch (err) {
    return next(
      new HttpError(
        "Adding entry to watchlist failed, please try again later",
        500
      )
    );
  }

  if (createdEntry === false || createdEntry.rowCount === 0) {
    return next(
      new HttpError(
        "Adding entry to watchlist failed, please try again later",
        500
      )
    );
  }

  if (createdAnimeRating != false) {
    res.status(201).json({
      success: true,
      rated: true,
      watchlistEntry: createdEntry.rows[0],
      animeRating: createdAnimeRating.rows[0],
    });
  } else {
    res.status(201).json({
      success: true,
      rated: true,
      watchlistEntry: createdEntry.rows[0],
      animeRating: "The anime was not rated for now",
    });
  }
};

const isAnimeInWatchlist = (req, res, next) => {};

const animeRevereseWatchlist = (req, res, next) => {};

const deleteAnimeFromWatchlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs provided, please check your inputs", 422)
    );
  }
  const userid = req.params.uid;
  const { animeid } = req.body;

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
        "Deleting anime from watchlist failed, please try again later",
        500
      )
    );
  }

  if (req.userData.userId != userid) {
    return next(
      new HttpError("User trying to delete another user's watchlist item", 403)
    );
  }

  let existingEntry = false;
  try {
    existingEntry = await db.query(
      "SELECT * FROM " +
        tables.watchlist +
        " WHERE " +
        watchlist.animeIDNOTNULL +
        " = $1 AND " +
        watchlist.userIDNOTNULL +
        " = $2 ;",
      [animeid, userid]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Deleting anime from watchlist failed, please try again later",
        500
      )
    );
  }
  if (existingEntry === false) {
    return next(
      new HttpError(
        "Deleting anime from watchlist failed, please try again later",
        500
      )
    );
  }

  if (existingEntry.rowCount != 0) {
    let queryText3 =
      "DELETE FROM " +
      tables.watchlist +
      " WHERE " +
      watchlist.animeIDNOTNULL +
      " = " +
      animeid +
      " AND " +
      watchlist.userIDNOTNULL +
      " = '" +
      userid +
      "' RETURNING * ;";

    let deletedEntry;

    try {
      deletedEntry = await db.query(queryText3);
    } catch (err) {
      return next(
        new HttpError(
          "Deleting anime from watchlist failed, please try again later",
          500
        )
      );
    }

    if (deletedEntry === false || deletedEntry.rowCount === 0) {
      return next(
        new HttpError(
          "Deleting anime from watchlist failed, please try again later",
          500
        )
      );
    }

    //update all ratings now
    let updatedState = false;
    try {
      updatedState = await db.query("CALL update_animerank();");
    } catch (error) {
      return next(
        new HttpError(
          "updating rating of all anime failed, please try again later",
          500,
          false
        )
      );
    }

    if (updatedState === false) {
      return next(
        new HttpError(
          "updating rating of all anime failed, please try again later",
          500,
          false
        )
      );
    }

    res.status(201).json({
      success: true,
      deletedEntry: deletedEntry.rows[0],
    });
  } else {
    res.status(404).json({
      success: false,
      message:
        "There was no entry for this anime in user's watchlist, nothing to delete",
    });
  }
};

module.exports = {
  getWatchlistOfUser,
  addAnimeToWatchlist,
  deleteAnimeFromWatchlist,
  isAnimeInWatchlist,
  animeRevereseWatchlist,
};
