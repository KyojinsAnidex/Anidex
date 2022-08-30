const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAnimeByName = async (req, res, next) => {
  let searchedAnime;

  const { searchString } = req.body;
  let newSearchString = searchString.trim().replace(/ /g, " | ");
  // console.log(testString);

  let queryText = "SELECT * FROM search_anime( '" + newSearchString + "' ) ;";
  try {
    searchedAnime = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Searching anime failed, please try again later", 500)
    );
  }
  if (searchedAnime === false) {
    return next(
      new HttpError("Searching anime failed, please try again later", 500)
    );
  }
  if (searchedAnime.rowCount == 0) {
    res.status(404).json({
      success: false,
      message:
        "No anime with given name found, search with another name please.",
    });
  } else {
    res.status(200).json({
      success: true,
      resultAnime: searchedAnime.rows,
    });
  }
};

const getUserByName = async (req, res, next) => {
  let searchedUser;

  const { searchString } = req.body;
  let newSearchString = searchString.trim().replace(/ /g, " | ");
  // console.log(testString);

  let queryText = "SELECT * FROM search_users( '" + newSearchString + "' ) ;";
  
  try {
    searchedUser = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Searching user failed, please try again later", 500)
    );
  }
  if (searchedUser === false) {
    return next(
      new HttpError("Searching user failed, please try again later", 500)
    );
  }

  if (searchedUser.rowCount == 0) {
    res.status(404).json({
      success: false,
      message:
        "No user with given user found, search with another name please.",
    });
  } else {
    res.status(200).json({
      success: true,
      resultUser: searchedUser.rows,
    });
  }
};

const getCharByName = async (req, res, next) => {
  let searchedCharacter;

  const { searchString } = req.body;
  let newSearchString = searchString.trim().replace(/ /g, " | ");
  // console.log(testString);

  let queryText = "SELECT * FROM search_characters( '" + newSearchString + "' ) ;";
  
  try {
    searchedCharacter = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Searching character failed, please try again later", 500)
    );
  }

  if (searchedCharacter === false) {
    return next(
      new HttpError("Searching character failed, please try again later", 500)
    );
  }

  if (searchedCharacter.rowCount == 0) {
    res.status(404).json({
      success: false,
      message:
        "No character with given name found, search with another name please.",
    });
  } else {
    res.status(200).json({
      success: true,
      resultCharacter: searchedCharacter.rows,
    });
  }
};

const getPersonnelByName = async (req, res, next) => {
  let searchedPersonnel;

  const { searchString } = req.body;
  let newSearchString = searchString.trim().replace(/ /g, " | ");
  // console.log(testString);

  let queryText = "SELECT * FROM search_person( '" + newSearchString + "' ) ;";
  
  try {
    searchedPersonnel = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Searcing personnel failed, please try again later", 500)
    );
  }

  if (searchedPersonnel === false) {
    return next(
      new HttpError("Searching personnel failed, please try again later", 500)
    );
  }

  if (searchedPersonnel.rowCount == 0) {
    res.status(404).json({
      success: false,
      message:
        "No anime with given name found, search with another name please.",
    });
  } else {
    res.status(200).json({
      success: true,
      resultPersonnel: searchedPersonnel.rows,
    });
  }
};

const getStudioByName = async (req, res, next) => {
  let searchedStudio;

  const { searchString } = req.body;
  let newSearchString = searchString.trim().replace(/ /g, " | ");
  // console.log(testString);

  let queryText = "SELECT * FROM search_studio( '" + newSearchString + "' ) ;";
  
  try {
    searchedStudio = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Searching studio failed, please try again later", 500)
    );
  }

  if (searchedStudio === false) {
    return next(
      new HttpError("Searching studio failed, please try again later", 500)
    );
  }

  if (searchedStudio.rowCount == 0) {
    res.status(404).json({
      success: false,
      message:
        "No studio with given name found, search with another name please.",
    });
  } else {
    res.status(200).json({
      success: true,
      resultStudio: searchedStudio.rows,
    });
  }
};

const getEpisodeByName = async (req, res, next) => {
  let searchedEpisode;

  const { searchString } = req.body;
  let newSearchString = searchString.trim().replace(/ /g, " | ");
  // console.log(testString);

  let queryText = "SELECT * FROM search_episode( '" + newSearchString + "' ) ;";
    try {
    searchedEpisode = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Searcing episodes failed, please try again later", 500)
    );
  }

  if (searchedEpisode === false) {
    return next(
      new HttpError("Searching episode failed, please try again later", 500)
    );
  }

  if (searchedEpisode.rowCount == 0) {
    res.status(404).json({
      success: false,
      message:
        "No episodes with given name found, search with another name please.",
    });
  } else {
    res.status(200).json({
      success: true,
      resultEpisodes: searchedEpisode.rows,
    });
  }
};

module.exports = {
  getAnimeByName,
  getCharByName,
  getUserByName,
  getEpisodeByName,
  getPersonnelByName,
  getStudioByName,
};
