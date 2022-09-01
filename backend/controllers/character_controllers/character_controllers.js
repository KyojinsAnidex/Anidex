const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { unlink } = require("fs");
const path = require("path");

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
  let searchedChar = false,
    anime = false,
    voiceActor = false;

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

  if (searchedChar === false || searchedChar.rowCount === 0) {
    return next(
      new HttpError("Fetching character failed, please try again later.", 500)
    );
  }

  try {
    anime = await db.query(
      "SELECT " +
        dbModels.animecharacter.animeIDNOTNULL +
        " FROM " +
        dbModels.tables.animecharacter +
        " WHERE " +
        dbModels.animecharacter.characterIDNOTNULL +
        " = " +
        searchedChar.rows[0].characterid +
        ";"
    );
  } catch (err) {
    return next(
      new HttpError(
        "Fetching character's anime failed, please try again later.",
        500
      )
    );
  }

  if (anime === false || anime.rowCount === 0) {
    return next(
      new HttpError(
        "Fetching character's anime failed, please try again later.",
        500
      )
    );
  }

  try {
    voiceActor = await db.query(
      "SELECT " +
        dbModels.charactervoiceactor.personnelIDNOTNULL +
        " FROM " +
        dbModels.tables.charactervoiceactor +
        " WHERE " +
        dbModels.charactervoiceactor.characteridNOTNULL +
        " = " +
        searchedChar.rows[0].characterid +
        ";"
    );
  } catch (err) {
    return next(
      new HttpError(
        "Fetching character's voice actor failed, please try again later.",
        500
      )
    );
  }

  if (voiceActor === false || voiceActor.rowCount === 0) {
    return next(
      new HttpError(
        "Fetching character's voice actor failed, please try again later.",
        500
      )
    );
  }

  res.status(200).json({
    success: true,
    character: searchedChar.rows[0],
    anime: anime.rows,
    voiceActor: voiceActor.rows,
  });
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

  let newLastname = lastname.replace(/'/g, "''"),
    newFirstname = firstname.replace(/'/g, "''"),
    newDescription = description.replace(/'/g, "''");

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
      [newFirstname, newLastname]
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
    newFirstname +
    "' , '" +
    newLastname +
    "' , '" +
    gender +
    "' , '" +
    role +
    "' , '" +
    pictureid +
    "' , '" +
    age +
    "' , '" +
    newDescription +
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
    console.log(voiceActors);
  let newVoiceActors = voiceActors
    .replace(/[\[\]']+/g, "")
    .replace(/"/g, "")
    .split(",");
   
    console.log(newVoiceActors);

  newVoiceActors.forEach(async (element) => {
    queryText6 =
      "INSERT INTO " +
      dbModels.tables.charactervoiceactor +
      " VALUES ('" +
      createdChar.rows[0].characterid +
      "' , '" +
      element.trim() +
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
    .replace(/"/g, "")
    .split(",");

  newAnime.forEach(async (element) => {
    queryText6 =
      "INSERT INTO " +
      dbModels.tables.animecharacter +
      " VALUES ('" +
      element.trim() +
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

const deleteChar = async (req, res, next) => {
  const characterid = req.params.cid;

  let queryText = "",
    deleteStatus = false;

  queryText =
    "DELETE FROM " +
    dbModels.tables.characters +
    " WHERE " +
    dbModels.characters.characterIDNOTNULL +
    " = '" +
    characterid +
    "' RETURNING *;";

  try {
    deleteStatus = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Deleting character failed, please try again later", 500)
    );
  }

  if (deleteStatus === false || deleteStatus.rowCount === 0) {
    return next(
      new HttpError("Deleting character failed, please try again later", 500)
    );
  }

  //delete pic
  unlink(
    path.join("./uploads/images", deleteStatus.rows[0].pictureid),
    (err) => {
      if (err)
        console.log(
          "ERROR DELETING CHARACTER PICTURE AFTER CHARACTER DELETION\n" + err
        );
    }
  );

  res.status(201).json({
    success: true,
    message: "Deleted Character Successfully",
    deletedCharacter: deleteStatus.rows[0],
  });
};

module.exports = {
  getAllChar,
  getAChar,
  addAChar,
  editAChar,
  deleteChar,
};
