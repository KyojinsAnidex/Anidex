const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
      message: "No person with provided characterID",
    });
  } else {
    res.status(200).json({
      success: true,
      person: searchedPerson.rows[0],
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

  const { lastname, firstname, gender, birthday } = req.body;

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
      [firstname, lastname]
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
    " ) VALUES ( '" +
    firstname +
    "' , '" +
    lastname +
    "' , '" +
    gender +
    "' , '" +
    birthday +
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
  } else {
    res.status(201).json({
      success: true,
      newPerson: createdPerson.rows[0],
      personnelID: createdPerson.rows[0].personnelid,
    });
  }
};

module.exports = {
  getAllPerson,
  getSinglePerson,
  addPerson,
};
