const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAllChar = async (req, res, next) => {
  common.getAllFromTable(
    req,
    res,
    next,
    dbModels.tables.characters,
    "characters"
  );
};

const getAChar = async (req, res, next) => {
  let searchedChar;

  const charID = req.params.cid;

  try {
    searchedChar = await db.query(
      "SELECT * FROM " +
        dbModels.tables.characters +
        " WHERE " +
        dbModels.characters.characterIDNOTNULL +
        " = $1 ;",
      [charID]
    );
  } catch (err) {
    return next(
      new HttpError("Fetching character failed, please try again later.", 500)
    );
  }

  if (searchedChar === false) {
    return next(
      new HttpError("Fetching character failed, please try again later.", 500)
    );
  }

  if (searchedChar.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "No character with provided characterID",
    });
  } else {
    res.status(200).json({
      success: true,
      character: searchedChar.rows[0],
    });
  }
};

const addAChar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs provided, please check your inputs", 422)
    );
  }

  const {
    lastname,
    firstname,
    gender,
    role,
    age,
    description,
    anime,
    voiceActors,
  } = req.body;

  if (!req.file) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const pictureid = req.file.path.split("\\")[2];
  let existingChar;

  try {
    existingChar = await db.query(
      "SELECT * FROM " +
        dbModels.tables.characters +
        " WHERE " +
        dbModels.characters.firstnameNOTNULL +
        " = $1 AND " +
        dbModels.characters.lastnameNOTNULL +
        " = $2 ;",
      [firstname, lastname]
    );
  } catch (err) {
    return next(
      new HttpError("Adding new character failed, please try again later", 500)
    );
  }
  if (existingChar === false) {
    return next(
      new HttpError("Adding new character failed, please try again later", 500)
    );
  }
  if (existingChar.rowCount != 0) {
    return next(new HttpError("Character with same name exists already", 422));
  }

  let createdChar;
  let queryText;
  queryText =
    "INSERT INTO " +
    dbModels.tables.characters +
    " ( " +
    dbModels.characters.firstnameNOTNULL +
    ", " +
    dbModels.characters.lastnameNOTNULL +
    ", " +
    dbModels.characters.gender +
    ", " +
    dbModels.characters.role +
    ", " +
    dbModels.characters.pictureid +
    ", " +
    dbModels.characters.age +
    ", " +
    dbModels.characters.description +
    " ) VALUES ( '" +
    firstname +
    "' , '" +
    lastname +
    "' , '" +
    gender +
    "' , '" +
    role +
    "' , '" +
    pictureid +
    "' , '" +
    age +
    "' , '" +
    description +
    "' ) RETURNING * ;";
  try {
    createdChar = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Adding character failed, please try again later", 500)
    );
  }
  if (createdChar === false || createdChar.rowCount === 0) {
    return next(
      new HttpError("Adding character failed, please try again later", 500)
    );
  }

  //insert character voice actors;
  let queryText6 = "",
    voiceActorStatus = false,
    animeStatus = false;

  let newVoiceActors = voiceActors
    .replace(/[\[\]']+/g, "")
    .replace(/\s+/g, "")
    .replace(/"/g, "")
    .split(",");

  newVoiceActors.forEach(async (element) => {
    queryText6 =
      "INSERT INTO " +
      dbModels.tables.charactervoiceactor +
      " VALUES ('" +
      createdChar.rows[0].characterid +
      "' , '" +
      element +
      "') RETURNING *;";
    voiceActorStatus = false;

    try {
      voiceActorStatus = await db.query(queryText6);
    } catch (err) {
      return next(
        new HttpError(
          "Added character. Adding character voice actors failed, please try again later",
          500
        )
      );
    }
  });

  // insert the anime of the characters
  let newAnime = anime
    .replace(/[\[\]']+/g, "")
    .replace(/\s+/g, "")
    .replace(/"/g, "")
    .split(",");

  newAnime.forEach(async (element) => {
    queryText6 =
      "INSERT INTO " +
      dbModels.tables.animecharacter +
      " VALUES ('" +
      element +
      "' , '" +
      createdChar.rows[0].characterid +
      "') RETURNING *;";
    animeStatus = false;

    try {
      animeStatus = await db.query(queryText6);
    } catch (err) {
      return next(
        new HttpError(
          "Added character and voice actor. Adding character anime failed, please try again later",
          500
        )
      );
    }
  });

  res.status(201).json({
    success: true,
    characterid: createdChar.rows[0].characterid,
  });
};

const editAChar = async (req, res, next) => {};

module.exports = {
  getAllChar,
  getAChar,
  addAChar,
  editAChar,
};
