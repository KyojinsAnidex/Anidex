const { validationResult } = require("express-validator");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAllWatchroom = async (req, res, next) => {
  common.getAllFromTable(
    req,
    res,
    next,
    dbModels.tables.watchroom,
    "watchroom"
  );
};

const getSingleWatchroom = async (req, res, next) => {
  let searchedWatchroom;

  const watchroomid = req.params.watchroomid;

  try {
    searchedWatchroom = await db.query(
      "SELECT * FROM " +
        dbModels.tables.watchroom +
        " WHERE " +
        dbModels.watchroom.watchroomidNOTNULL +
        " = $1 ;",
      [watchroomid]
    );
  } catch (err) {
    return next(
      new HttpError("Fetching watchroom failed, please try again later.", 500)
    );
  }

  if (searchedWatchroom === false) {
    return next(
      new HttpError("Fetching watchroom failed, please try again later.", 500)
    );
  }

  if (searchedWatchroom.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "No watchroom with provided watchroom id",
    });
  } else {
    res.status(200).json({
      success: true,
      watchroom: searchedWatchroom.rows[0],
    });
  }
};

const makeWatchroom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs for watchroom were provided, please check your inputs",
        422
      )
    );
  }

  const { watchroomname, animeid, description, duration } = req.body;

  let existingWatchroom;

  try {
    existingWatchroom = await db.query(
      "SELECT * FROM " +
        dbModels.tables.watchroom +
        " WHERE " +
        dbModels.watchroom.watchroomnameNOTNULL +
        " = $1 ;",
      [watchroomname]
    );
  } catch (err) {
    return next(
      new HttpError("Adding new watchroom failed, please try again later", 500)
    );
  }
  if (existingWatchroom === false) {
    return next(
      new HttpError("Adding new watchroom failed, please try again later", 500)
    );
  }
  if (existingWatchroom.rowCount != 0) {
    return next(new HttpError("watchroom with same name exists already", 422));
  }

  let createdWatchroom;
  let queryText;
  queryText =
    "INSERT INTO " +
    dbModels.tables.watchroom +
    " ( " +
    dbModels.watchroom.watchroomnameNOTNULL +
    ", " +
    dbModels.watchroom.animeIDNOTNULL +
    ", " +
    dbModels.watchroom.description +
    ", " +
    dbModels.watchroom.starttimeNOTNULL +
    ", " +
    dbModels.watchroom.endtimeNOTNULL +
    " ) VALUES ( '" +
    watchroomname +
    "' , '" +
    animeid +
    "' , '" +
    description +
    "', localtimestamp, localtimestamp + '" +
    duration +
    " days" +
    "' ) RETURNING * ;";
  try {
    createdWatchroom = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Adding watchroom failed, please try again later", 500)
    );
  }
  if (createdWatchroom === false) {
    return next(
      new HttpError("Adding watchroom failed, please try again later", 500)
    );
  }
  if (createdWatchroom.rowCount === 0) {
    return next(
      new HttpError("Adding watchroom failed, please try again later", 500)
    );
  } else {
    res.status(201).json({
      success: true,
      watchroomid: createdWatchroom.rows[0].watchroomid,
    });
  }
};

const getParticipants = async (req, res, next) => {
  let searchedWatchroom;
  const watchroomid = req.params.watchroomid;

  try {
    searchedWatchroom = await db.query(
      "SELECT * FROM " +
        dbModels.tables.watchroom +
        " WHERE " +
        dbModels.watchroom.watchroomidNOTNULL +
        " = $1 ;",
      [watchroomid]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Fetching watchroom participants failed, please try again later",
        500
      )
    );
  }
  if (searchedWatchroom === false) {
    return next(
      new HttpError(
        "Fetching watchroom participants failed, please try again later",
        500
      )
    );
  }

  if (searchedWatchroom.rowCount === 0) {
    return next(new HttpError("No watchroom with provided id found", 404));
  }

  let participants;
  try {
    participants = await db.query(
      "SELECT " +
        dbModels.watchroomparticipants.userIDNOTNULL +
        " FROM " +
        dbModels.tables.watchroomparticipants +
        " WHERE " +
        dbModels.watchroomparticipants.watchroomidNOTNULL +
        " = $1 ;",
      [watchroomid]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Fetching watchroom participants failed, please try again later",
        500
      )
    );
  }

  if (participants === false) {
    return next(
      new HttpError(
        "Fetching watchroom participants failed due to query error, please try again later",
        500
      )
    );
  }

  if (participants.rowCount > 0) {
    res.status(200).json({
      success: true,
      participants: participants,
    });
  } else {
    return next(new HttpError("No participant found in the watchroom", 404));
  }
};

const addParticipants = async (req, res, next) => {
  const watchroomid = req.params.watchroomid;
  const { userid } = req.body;

  let existingEntry;
  try {
    existingEntry = await db.query(
      "SELECT * FROM " +
        dbModels.tables.watchroomparticipants +
        " WHERE " +
        dbModels.watchroomparticipants.watchroomidNOTNULL +
        " = $1 AND " +
        dbModels.watchroomparticipants.userIDNOTNULL +
        " = $2 ;",
      [watchroomid, userid]
    );
  } catch (err) {
    return next(new HttpError("Adding participatn to watchroom failed", 500));
  }

  if (existingEntry === false) {
    return next(new HttpError("Adding participatn to watchroom failed", 500));
  }

  if (existingEntry.rowCount > 0) {
    return next(new HttpError("Participant already in watchroom", 422));
  }

  let newParticipant;
  try {
    newParticipant = await db.query(
      "INSERT INTO " +
        dbModels.tables.watchroomparticipants +
        " VALUES ( '" +
        userid +
        "', '" +
        watchroomid +
        "' ) RETURNING * ;"
    );
  } catch (err) {
    return next(new HttpError("Adding participatn to watchroom failed", 500));
  }

  if (newParticipant === false) {
    return next(new HttpError("Adding participatn to watchroom failed", 500));
  }

  if (newParticipant.rowCount != 0) {
    res.status(201).json({
      success: true,
      participant: newParticipant.rows[0],
    });
  } else {
    return next(new HttpError("Adding participatn to watchroom failed", 500));
  }
};

module.exports = {
  getAllWatchroom,
  getSingleWatchroom,
  makeWatchroom,
  getParticipants,
  addParticipants,
};
