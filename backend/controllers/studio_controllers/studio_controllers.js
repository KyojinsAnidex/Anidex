const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAllStudio = async (req, res, next) => {
  common.getAllFromTable(req, res, next, dbModels.tables.studio, "studio");
};

const getSingleStudio = async (req, res, next) => {
  let searchedStudio = false,
    animebystudio = false;

  const studioname = req.params.studioname;

  try {
    searchedStudio = await db.query(
      "SELECT * FROM " +
        dbModels.tables.studio +
        " WHERE " +
        dbModels.studio.studioIDNOTNULL +
        " = $1 ;",
      [studioname]
    );
  } catch (err) {
    return next(
      new HttpError("Fetching studio failed, please try again later.", 500)
    );
  }

  if (searchedStudio === false) {
    return next(
      new HttpError("Fetching studio failed, please try again later.", 500)
    );
  }

  if (searchedStudio.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "No studio with provided studioname",
    });
  } else {
    try {
      animebystudio = await db.query(
        "SELECT * FROM " +
          dbModels.tables.animestudio +
          " JOIN " +
          dbModels.tables.anime +
          " ON " +
          dbModels.tables.animestudio +
          "." +
          dbModels.animestudio.animeIDNOTNULL +
          " = " +
          dbModels.tables.anime +
          "." +
          dbModels.anime.animeIDNOTNULL +
          " WHERE " +
          dbModels.tables.animestudio + 
          "." +
          dbModels.animestudio.studioIDNOTNULL + 
          " = '" +
          studioname +
          "' ; "
      );
    } catch (err) {
      return next(
        new HttpError(
          "Fetching studio items failed, please try again later.",
          500,
          false
        )
      );
    }

    if (animebystudio === false) {
      return next(
        new HttpError(
          "Fetching studio items failed, please try again later.",
          500,
          false
        )
      );
    }

    res.status(200).json({
      success: true,
      studio: searchedStudio.rows[0],
      animebystudio: animebystudio.rows,
    });
  }
};

const getAnimeOfStudio = async (req, res, next) => {
  let studioAnime;

  const searchedStudio = req.params.studioname;

  try {
    studioAnime = await db.query(
      "SELECT " +
        dbModels.animestudio.animeIDNOTNULL +
        " FROM " +
        dbModels.tables.animestudio +
        " WHERE " +
        dbModels.animestudio.studioIDNOTNULL +
        " = $1 ;",
      [searchedStudio]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Fetching anime of this studio failed at query execution, please try again later.",
        500
      )
    );
  }

  if (studioAnime === false) {
    return next(
      new HttpError(
        "Fetching anime of this studio failed at query execution, please try again later.",
        500
      )
    );
  }

  if (studioAnime.rowCount != 0) {
    res.status(200).json({
      success: true,
      animeOfStudio: studioAnime.rows,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No anime of that studio was found",
    });
  }
};

const addStudio = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs provided, please check your inputs", 422)
    );
  }

  const { studioname, office_address, website } = req.body;

  let existingStudio;

  try {
    existingStudio = await db.query(
      "SELECT * FROM " +
        dbModels.tables.studio +
        " WHERE " +
        dbModels.studio.studioIDNOTNULL +
        " = $1 ;",
      [studioname]
    );
  } catch (err) {
    return next(
      new HttpError("Adding new studio failed, please try again later", 500)
    );
  }
  if (existingStudio === false) {
    return next(
      new HttpError("Adding new studio failed, please try again later", 500)
    );
  }
  if (existingStudio.rowCount != 0) {
    return next(new HttpError("studio with same name exists already", 422));
  }

  let createdStudio;
  let queryText;
  queryText =
    "INSERT INTO " +
    dbModels.tables.studio +
    " ( " +
    dbModels.studio.studioIDNOTNULL +
    ", " +
    dbModels.studio.office_address +
    ", " +
    dbModels.studio.website +
    " ) VALUES ( '" +
    studioname +
    "', '" +
    office_address +
    "', '" +
    website +
    "' ) RETURNING * ;";
  try {
    createdStudio = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Adding studio failed, please try again later", 500)
    );
  }

  if (createdStudio === false || createdStudio.rowCount === 0) {
    return next(
      new HttpError("Adding studio failed, please try again later", 500)
    );
  } else {
    res.status(201).json({
      success: true,
      newStudio: createdStudio.rows[0],
    });
  }
};

module.exports = {
  getAllStudio,
  getSingleStudio,
  getAnimeOfStudio,
  addStudio,
};
