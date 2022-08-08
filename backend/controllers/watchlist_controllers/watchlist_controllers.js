const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const common = require("../common_controllers/common");

const { tables, anime, watchlist, users } = require("../../models/db_models");

const getWatchlistOfUser = async (req, res, next) => {
  const userID = req.params.uid;

  let userWatchlist;

  let queryText =
    "SELECT " +
    watchlist.animeIDNOTNULL +
    " FROM " +
    tables.watchlist +
    " WHERE " +
    watchlist.userIDNOTNULL +
    " = $1";

  try {
    userWatchlist = await db.query(queryText, [userID]);
  } catch (err) {
    return next(
      new HttpError("Fetching watchlist failed, please try again later.", 500)
    );
  }

  if (userWatchlist.rowCount != 0) {
    res.status(200).json({
      success: true,
      watchlist_anime: userWatchlist.rows,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "watchlist empty with provided userID",
    });
  }
};

module.exports = {
  getWatchlistOfUser,
};
