const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAllEpisodes = async (req, res, next) => {
  const animeid = req.params.aid;
  let episodes;
  try {
    episodes = await db.query(
      "SELECT * FROM " +
        dbModels.tables.episode +
        " WHERE " +
        dbModels.episode.animeIDNOTNULL +
        " = $1 ;",
      [animeid]
    );
  } catch (err) {
    return next(
      new HttpError(
        "Fetching episodes of this anime failed, please try again later",
        500
      )
    );
  }

  if (episodes === false) {
    return next(
      new HttpError(
        "Fetching episodes of this anime failed, please try again later",
        500
      )
    );
  }

  if (episodes.rowCount != 0) {
    res.status(200).json({
      success: true,
      episodes: episodes.rows,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No episodes found for this anime id",
    });
  }
};

const getSingleEpisode = async (req, res, next) => {
  const episodeid = req.params.episodeid;
  let episode;
  try {
    episode = await db.query(
      "SELECT * FROM " +
        dbModels.tables.episode +
        " WHERE " +
        dbModels.episode.episodeidNOTNULL +
        " = $1 ;",
      [episodeid]
    );
  } catch (err) {
    return next(
      new HttpError("Fetching this episode failed, please try again later", 500)
    );
  }

  if (episode === false) {
    return next(
      new HttpError("Fetching this episode failed, please try again later", 500)
    );
  }

  if (episode.rowCount != 0) {
    res.status(200).json({
      success: true,
      episode: episode.rows[0],
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No episode found for this episode id",
    });
  }
};

const addEpisode = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs provided, please check your inputs", 422)
    );
  }

  const { episode, season, animeid, title, airingdate, runtime } = req.body;

  let existingEpisode;
  try {
    existingEpisode = await db.query(
      "SELECT * FROM " +
        dbModels.tables.episode +
        " WHERE " +
        dbModels.episode.animeIDNOTNULL +
        " = $1 AND " +
        dbModels.episode.seasonNOTNULL +
        " = $2 AND " +
        dbModels.episode.episodeNOTNULL +
        " = $3 ;",
      [animeid, season, episode]
    );
  } catch (err) {
    return next(
      new HttpError("Adding new episode failed, please try again later.", 500)
    );
  }

  if (existingEpisode === false) {
    return next(
      new HttpError("Adding new episode failed, please try again later.", 500)
    );
  }

  if (existingEpisode.rowCount != 0) {
    return next(new HttpError("Episode already added", 422));
  }

  let createdEpisode;
  let newtitle = title.replace(/'/, "''");
  
  try {
    createdEpisode = await db.query(
      "INSERT INTO " +
        dbModels.tables.episode +
        " (" +
        dbModels.episode.episodeNOTNULL +
        ", " +
        dbModels.episode.seasonNOTNULL +
        ", " +
        dbModels.episode.animeIDNOTNULL +
        ", " +
        dbModels.episode.title +
        ", " +
        dbModels.episode.airingdate +
        ", " +
        dbModels.episode.runtime +
        ") VALUES ('" +
        episode +
        "', '" +
        season +
        "', '" +
        animeid +
        "', '" + 
        newtitle +
        "' , '" +
        airingdate +
        "' , '" +
        runtime +
        "' ) RETURNING * ;"
    );
  } catch (err) {
    return next(
      new HttpError("Adding episode failed, please try again later", 500)
    );
  }

  if (createdEpisode === false) {
    return next(
      new HttpError("Adding episode failed, please try again later", 500)
    );
  }

  if (createdEpisode.rowCount != 0) {
    res.status(201).json({
      success: true,
      newEpisode: createdEpisode.rows[0],
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Adding episode failed, please try again later",
    });
  }
};

module.exports = {
  getAllEpisodes,
  getSingleEpisode,
  addEpisode,
};
