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
    ", " + 
    watchlist.favouriteNOTNULL + 
    " FROM " +
    tables.watchlist +
    " WHERE " +
    watchlist.userIDNOTNULL +
    " = $1 ;";

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

const addAnimeToWatchlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return next(
      new HttpError("Invalid inputs provided, please check your inputs", 422)
    );
  }
  const userid = req.params.uid;
  const {animeid, favourite} = req.body;

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
      new HttpError("Adding entry to watchlist failed, please try again later", 500)
    );
  }

  if (existingEntry.rowCount != 0) {
    return next(
      new HttpError("Anime already in your watchlist!", 422)
    );
  }

  let createdEntry;
  let queryText;
  queryText = 
  "INSERT INTO " + 
  tables.watchlist + 
  " VALUES ( '" + 
  userid + 
  "', " + 
  favourite + 
  ", " + 
  animeid +
  " ) RETURNING * ;"
  ;
  try {
    createdEntry = await db.query(queryText)
  } catch (err) {
    return next(
      new HttpError("Adding entry to watchlist failed, please try again later", 500)
    );
  }

  if (createdEntry.rowCount === 0) {
    return next(
      new HttpError("Adding entry to watchlist failed, please try again later", 500)
    );
  }

  res.status(201).json({
    success: true, 
    watchlistEntry: createdEntry.rows[0]
  });
};

const deleteAnimeFromWatchlist = (req, res, next) => {};

module.exports = {
  getWatchlistOfUser,
  addAnimeToWatchlist,
  deleteAnimeFromWatchlist,
};
