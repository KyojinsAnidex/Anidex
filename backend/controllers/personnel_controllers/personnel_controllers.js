const { validationResult } = require("express-validator");
const path = require("path");
const { unlink } = require("fs");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAllPerson = async (req, res, next) => {
  common.getAllFromTable(
    req,
    res,
    next,
    dbModels.tables.personnel,
    "personnel"
  );
};

const getSinglePerson = async (req, res, next) => {
  let searchedPerson;
  let workedOnAnime = false;

  const personID = req.params.pid;

  try {
    searchedPerson = await db.query(
      "SELECT * FROM " +
        dbModels.tables.personnel +
        " WHERE " +
        dbModels.personnel.personnelIDNOTNULL +
        " = $1 ;",
      [personID]
    );
  } catch (err) {
    return next(
      new HttpError("Fetching person failed, please try again later.", 500)
    );
  }

  if (searchedPerson === false || searchedPerson.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "No person with provided personnel id",
    });
  } else {
    try {
      workedOnAnime = await db.query(
        "SELECT * FROM " +
          dbModels.tables.animestaff +
          " WHERE " +
          dbModels.animestaff.personnelID +
          " = " +
          searchedPerson.rows[0].personnelid +
          "; "
      );
    } catch (err) {
      return next(
        new HttpError(
          "Fetching person failed, please try again later.",
          500,
          false
        )
      );
    }
    if (workedOnAnime === false) {
      return next(
        new HttpError(
          "Fetching person failed, please try again later.",
          500,
          false
        )
      );
    }
    res.status(200).json({
      success: true,
      person: searchedPerson.rows[0],
      workedOnAnime: workedOnAnime.rows,
    });
  }
};

const addPerson = async (req, res, next) => {
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
    birthday,
    address,
    website,
    anime,
    role,
  } = req.body;

  if (!req.file) {
    return next(
      new HttpError("Invalid inputs passed, please check your data 1.", 422)
    );
  }

  const pictureid = req.file.path.split("\\")[2];

  let newFirstname = firstname.replace(/'/g, "''"),
    newLastname = lastname.replace(/'/g, "''"),
    newAddress = address.replace(/'/g, "''"),
    newWebsite = website.replace(/'/g, "''");

  let existingPerson;

  try {
    existingPerson = await db.query(
      "SELECT * FROM " +
        dbModels.tables.personnel +
        " WHERE " +
        dbModels.personnel.firstnameNOTNULL +
        " = $1 AND " +
        dbModels.personnel.lastnameNOTNULL +
        " = $2 ;",
      [newFirstname, newLastname]
    );
  } catch (err) {
    return next(
      new HttpError("Adding new person failed, please try again later", 500)
    );
  }
  if (existingPerson === false) {
    return next(
      new HttpError("Adding new person failed, please try again later", 500)
    );
  }
  if (existingPerson.rowCount != 0) {
    return next(new HttpError("person with same name exists already", 422));
  }

  let createdPerson;
  let queryText;
  queryText =
    "INSERT INTO " +
    dbModels.tables.personnel +
    " ( " +
    dbModels.personnel.firstnameNOTNULL +
    ", " +
    dbModels.personnel.lastnameNOTNULL +
    ", " +
    dbModels.personnel.gender +
    ", " +
    dbModels.personnel.birthday +
    ", " +
    dbModels.personnel.pictureIDNOTNULL +
    ", " +
    dbModels.personnel.address +
    ", " +
    dbModels.personnel.website +
    " ) VALUES ( '" +
    newFirstname +
    "' , '" +
    newLastname +
    "' , '" +
    gender +
    "' , '" +
    birthday +
    "' , '" +
    pictureid +
    "' , '" +
    newAddress +
    "' , '" +
    newWebsite +
    "' ) RETURNING * ;";
  try {
    createdPerson = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Adding person failed, please try again later", 500)
    );
  }

  if (createdPerson === false || createdPerson.rowCount === 0) {
    return next(
      new HttpError("Adding person failed, please try again later", 500)
    );
  }

  // add anime of the personnel
  let queryText6 = "",
    animeStatus = false;
  let newAnime = anime
    .replace(/[\[\]']+/g, "")
    .replace(/\s+/g, "")
    .replace(/"/g, "")
    .split(",");

  // let newRoles = role
  //   .replace(/[\[\]']+/g, "")
  //   .replace(/\s+/g, "")
  //   .replace(/"/g, "")
  //   .split(",");
  let i = 0;

  newAnime.forEach(async (element) => {
    // personnelRole = newRoles[i++];
    queryText6 =
      "INSERT INTO " +
      dbModels.tables.animestaff +
      " ( " +
      dbModels.animestaff.personnelID +
      " , " +
      dbModels.animestaff.animeIDNOTNULL +
      " ) ";
    " VALUES ('" +
      createdPerson.rows[0].personnelid +
      "' , '" +
      element +
      "') RETURNING *;";

    animeStatus = false;

    try {
      animeStatus = await db.query(queryText6);
    } catch (err) {
      return next(
        new HttpError(
          "Added personnel. Adding personnel anime failed, please try again later",
          500
        )
      );
    }
  });

  res.status(201).json({
    success: true,
    // newPerson: createdPerson.rows[0],
    personnelID: createdPerson.rows[0].personnelid,
  });
};

const deletePerson = async (req, res, next) => {
  const personnelid = req.params.pid;

  let queryText = "",
    deleteStatus = false;

  queryText =
    "DELETE FROM " +
    dbModels.tables.personnel +
    " WHERE " +
    dbModels.personnel.personnelIDNOTNULL +
    " = '" +
    personnelid +
    "' RETURNING *;";

  try {
    deleteStatus = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Deleting person failed, please try again later", 500)
    );
  }

  if (deleteStatus === false || deleteStatus.rowCount === 0) {
    return next(
      new HttpError("Deleting person failed, please try again later", 500)
    );
  }

  //delete pic
  unlink(
    path.join("./uploads/images", deleteStatus.rows[0].pictureid),
    (err) => {
      if (err)
        console.log(
          "ERROR DELETING PERSON PICTURE AFTER PERSON DELETION\n" + err
        );
    }
  );

  res.status(201).json({
    success: true,
    message: "Deleted person Successfully",
    deletedPerson: deleteStatus.rows[0],
  });
};

module.exports = {
  getAllPerson,
  getSinglePerson,
  addPerson,
  deletePerson,
};
