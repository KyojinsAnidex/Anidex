const { validationResult } = require("express-validator");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAllGenre = async (req, res, next) => {
  common.getAllFromTable(req, res, next, dbModels.tables.genre, "genre");
};

const getGenreAnime = async (req, res, next) => {
  let genreAnime;

  const { searchedGenre } = req.body;

  try {
    genreAnime = await db.query(
      "SELECT " +
        dbModels.animeisofgenre.animeIDNOTNULL +
        " FROM " +
        dbModels.tables.animeisofgenre +
        " WHERE " +
        dbModels.animeisofgenre.genreNameNOTNULL +
        " = $1 ;",
      [searchedGenre]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Fetching anime of this genre failed at query execution, please try again later.",
        500
      )
    );
  }

  if (genreAnime === false) {
    return next(
      new HttpError(
        "Fetching anime of this genre failed at query execution, please try again later.",
        500
      )
    );
  }

  if (genreAnime.rowCount != 0) {
    res.status(200).json({
      success: true,
      animeOfGenre: genreAnime.rows,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No anime of that genre was found",
    });
  }
};

const addGenre = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs provided, please check your inputs", 422)
    );
  }

  const { genre } = req.body;

  let existingGenre;

  try {
    existingGenre = await db.query(
      "SELECT * FROM " +
        dbModels.tables.genre +
        " WHERE " +
        dbModels.genre.genreIDNOTNULL +
        " = $1 ;",
      [genre]
    );
  } catch (err) {
    return next(
      new HttpError("Adding new genre failed, please try again later", 500)
    );
  }
  if (existingGenre === false) {
    return next(
      new HttpError("Adding new genre failed, please try again later", 500)
    );
  }
  if (existingGenre.rowCount != 0) {
    return next(new HttpError("genre with same name exists already", 422));
  }

  let createdGenre;
  let queryText;
  queryText =
    "INSERT INTO " +
    dbModels.tables.genre +
    " ( " +
    dbModels.genre.genreIDNOTNULL +
    " ) VALUES ( '" +
    genre.replace(/'/g, "''") +
    "' ) RETURNING * ;";
  try {
    createdGenre = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Adding genre failed, please try again later", 500)
    );
  }

  if (createdGenre === false || createdGenre.rowCount === 0) {
    return next(
      new HttpError("Adding genre failed, please try again later", 500)
    );
  } else {
    res.status(201).json({
      success: true,
      newGenreName: createdGenre.rows[0].genrename,
    });
  }
};

module.exports = {
  getAllGenre,
  getGenreAnime,
  addGenre,
};
