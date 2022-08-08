const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAllAnime = async (req, res, next) => {
  common.getAllFromTable(req, res, next, dbModels.tables.anime, "anime");
};

const getAnimeByID = async (req, res, next) => {
  let searchedAnime;

  const animeID = req.params.aid;
  let queryText =
    "SELECT * FROM " +
    dbModels.tables.anime +
    " WHERE " +
    dbModels.anime.animeIDNOTNULL +
    " = $1";

  try {
    searchedAnime = await db.query(queryText, [animeID]);
  } catch (err) {
    return next(
      new HttpError("Fetching anime failed, please try again later.", 500)
    );
  }

  if (searchedAnime.rowCount != 0) {
    res.status(200).json({
      success: true,
      anime: searchedAnime.rows[0],
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No anime with provided animeID",
    });
  }
};

const getAllAnimePictures = async (req, res, next) => {
  const animeID = req.params.aid;
  let queryText =
    "SELECT " +
    dbModels.animepicture.pictureIDNOTNULL +
    ", " +
    dbModels.animepicture.poster +
    " FROM " +
    dbModels.tables.animepicture +
    " WHERE " +
    dbModels.animepicture.animeIDNOTNULL +
    " = " +
    animeID +
    ";";

  let searchedPics;
  try {
    searchedPics = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Fetching anime gallery failed, please try again later",
        500
      )
    );
  }

  if (searchedPics.rowCount != 0) {
    res.status(200).json({
      success: true,
      gallery: searchedPics.rows,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No pictures found for this anime, please check the anime ID",
    });
  }
};

/**
 *
 * @param {*} req               request to process
 * @param {*} res               response to send, will have the anime's studios,
 *                              character, personnel and genre ids
 * @param {*} next              next middleware/router callback
 */
const getAllAnimeItems = async (req, res, next) => {
  const animeid = req.params.aid;
  let animeItems = {
    genre : {},
    studios: {},
    charcters: {},
    personnel: {},
  };

  try {
    animeItems.genre = await db.query(
      "SELECT " +
        dbModels.animeisofgenre.genreNameNOTNULL +
        " FROM " +
        dbModels.tables.animeisofgenre +
        " WHERE " +
        dbModels.animeisofgenre.animeIDNOTNULL +
        " = " + animeid
    );
    animeItems.charcters = await db.query(
      "SELECT " +
        dbModels.animecharacter.characterIDNOTNULL +
        " FROM " +
        dbModels.tables.animecharacter +
        " WHERE " +
        dbModels.animecharacter.animeIDNOTNULL +
        " = " + animeid
    );
    animeItems.personnel = await db.query(
      "SELECT " +
        dbModels.animestaff.personnelID +
        " FROM " +
        dbModels.tables.animestaff +
        " WHERE " +
        dbModels.animestaff.animeIDNOTNULL +
        " = " + animeid
    );
    animeItems.studios = await db.query(
      "SELECT " +
        dbModels.animestudio.studioIDNOTNULL +
        " FROM " +
        dbModels.tables.animestudio +
        " WHERE " +
        dbModels.animestudio.animeIDNOTNULL +
        " = " + animeid
    );
  } catch (err) {
    return next(
      new HttpError("Fetching anime items failed, please try again later", 500)
    );
  }

  //all row empty, got no data for anime; any row empty, frontend just says no data for that item particularly
  if (
    animeItems.charcters.rowCount == 0 &&
    animeItems.genre.rowCount == 0 &&
    animeItems.personnel.rowCount == 0 &&
    animeItems.studios.rowCount == 0
  ) {
    res.status(404).json({
      success: false,
      message:
        "No characters, personnel, genre and studio data found for this anime.",
    });
  } else {
    res.status(200).json({
      success: true,
      characters: animeItems.charcters.rows,
      genre: animeItems.genre.rows,
      personnel: animeItems.personnel.rows,
      studios: animeItems.studios.rows,
    });
  }
};

const addAnime = (req, res, next) => {
  
};

const editAnime = (req, res, next) => {

};

module.exports = {
  getAllAnime,
  getAnimeByID,
  getAllAnimePictures,
  getAllAnimeItems,
  addAnime,
  editAnime
};
