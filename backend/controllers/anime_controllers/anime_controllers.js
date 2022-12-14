const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");
const check_animeid = require("../../utils/check_animeid");

const getAllAnime = async (req, res, next) => {
  common.getAllFromTable(req, res, next, dbModels.tables.anime, "anime");
};

const getAnimeByID = async (req, res, next) => {
  let searchedAnime = false;
  let animeGenres = false,
    animeStudios = false,
    animeGallery = false;

  const animeID = req.params.aid;
  let queryText =
    "SELECT * FROM " +
    dbModels.tables.anime +
    " WHERE " +
    dbModels.anime.animeIDNOTNULL +
    " = $1 ;";

  try {
    searchedAnime = await db.query(queryText, [animeID]);
  } catch (err) {
    return next(
      new HttpError(
        "Fetching anime failed, please try again later.",
        500,
        false
      )
    );
  }
  if (searchedAnime === false) {
    return next(
      new HttpError(
        "Fetching anime failed, please try again later.",
        500,
        false
      )
    );
  }

  if (searchedAnime.rowCount != 0) {
    try {
      animeGenres = await db.query(
        "SELECT " +
          dbModels.animeisofgenre.genreNameNOTNULL +
          " FROM " +
          dbModels.tables.animeisofgenre +
          " WHERE " +
          dbModels.animeisofgenre.animeIDNOTNULL +
          " = " +
          animeID +
          "; "
      );
      animeGallery = await db.query(
        "SELECT " +
          dbModels.animepicture.pictureIDNOTNULL +
          " FROM " +
          dbModels.tables.animepicture +
          " WHERE " +
          dbModels.animepicture.animeIDNOTNULL +
          " = " +
          animeID +
          " ;"
      );
      animeStudios = await db.query(
        "SELECT " +
          dbModels.animestudio.studioIDNOTNULL +
          " FROM " +
          dbModels.tables.animestudio +
          " WHERE " +
          dbModels.animestudio.animeIDNOTNULL +
          " = " +
          animeID +
          " ;"
      );
    } catch (err) {
      return next(
        new HttpError(
          "Fetching anime genres, pictures and studios failed, please try again later.",
          500,
          false
        )
      );
    }

    if (
      animeGenres === false ||
      animeStudios === false ||
      animeGallery === false
    ) {
      return next(
        new HttpError(
          "Fetching anime genres, pictures and studios failed, please try again later.",
          500,
          false
        )
      );
    }

    res.status(200).json({
      success: true,
      anime: searchedAnime.rows[0],
      animegenres: animeGenres.rows,
      animestudio: animeStudios.rows,
      animepicture: animeGallery.rows,
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
  if (searchedPics === false) {
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

const getAllAnimeItems = async (req, res, next) => {
  const animeid = req.params.aid;
  let animeItems = {
    genre: {},
    studios: {},
    charcters: {},
    personnel: {},
    watchrooms: {},
  };

  try {
    animeItems.genre = await db.query(
      "SELECT " +
        dbModels.animeisofgenre.genreNameNOTNULL +
        " FROM " +
        dbModels.tables.animeisofgenre +
        " WHERE " +
        dbModels.animeisofgenre.animeIDNOTNULL +
        " = " +
        animeid +
        ";"
    );
    animeItems.charcters = await db.query(
      "SELECT " +
        dbModels.animecharacter.characterIDNOTNULL +
        " FROM " +
        dbModels.tables.animecharacter +
        " WHERE " +
        dbModels.animecharacter.animeIDNOTNULL +
        " = " +
        animeid +
        ";"
    );
    animeItems.personnel = await db.query(
      "SELECT " +
        dbModels.animestaff.personnelID +
        " FROM " +
        dbModels.tables.animestaff +
        " WHERE " +
        dbModels.animestaff.animeIDNOTNULL +
        " = " +
        animeid +
        ";"
    );
    animeItems.studios = await db.query(
      "SELECT " +
        dbModels.animestudio.studioIDNOTNULL +
        " FROM " +
        dbModels.tables.animestudio +
        " WHERE " +
        dbModels.animestudio.animeIDNOTNULL +
        " = " +
        animeid +
        ";"
    );
    animeItems.watchrooms = await db.query(
      "SELECT " +
        dbModels.watchroom.watchroomidNOTNULL +
        " FROM " +
        dbModels.tables.watchroom +
        " WHERE " +
        dbModels.watchroom.animeIDNOTNULL +
        " = " +
        animeid +
        ";"
    );
  } catch (err) {
    return next(
      new HttpError("Fetching anime items failed, please try again later", 500)
    );
  }

  if (
    animeItems.charcters === false ||
    animeItems.genre === false ||
    animeItems.personnel === false ||
    animeItems.studios === false ||
    animeItems.watchrooms === false
  ) {
    return next(
      new HttpError("Fetching anime items failed, please try again later", 500)
    );
  }

  //all row empty, got no data for anime; any row empty, frontend just says no data for that item particularly
  if (
    animeItems.charcters.rowCount === 0 &&
    animeItems.genre.rowCount === 0 &&
    animeItems.personnel.rowCount === 0 &&
    animeItems.studios.rowCount === 0 &&
    animeItems.watchrooms.rowCount === 0
  ) {
    res.status(404).json({
      success: false,
      message:
        "No characters, personnel, genre, studio or watchroom data found for this anime.",
    });
  } else {
    res.status(200).json({
      success: true,
      characters: animeItems.charcters.rows,
      genre: animeItems.genre.rows,
      personnel: animeItems.personnel.rows,
      studios: animeItems.studios.rows,
      watchrooms: animeItems.watchrooms.rows,
    });
  }
};

const addAnime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs provided, please check your inputs 3", 422)
    );
  }

  const { title, releasedate, releaseseason, synopsis, genres, studios } =
    req.body;

  let newTitle = title.replace(/'/g, "''"),
    newSynopsis = synopsis.replace(/'/g, "''");

  if (!req.file) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const filepath = req.file.path;

  let existingAnime;
  try {
    existingAnime = await db.query(
      "SELECT * FROM " +
        dbModels.tables.anime +
        " WHERE " +
        dbModels.anime.titleNOTNULL +
        " = $1 ;",
      [newTitle]
    );
  } catch (err) {
    return next(
      new HttpError("Adding new anime failed, please try again later", 500)
    );
  }
  if (existingAnime === false) {
    return next(
      new HttpError("Adding new anime failed, please try again later", 500)
    );
  }

  if (existingAnime.rowCount != 0) {
    return next(new HttpError("Anime with same title exists already", 422));
  }

  let createdAnime;
  let queryText;
  queryText =
    "INSERT INTO " +
    dbModels.tables.anime +
    " ( " +
    dbModels.anime.titleNOTNULL +
    ", " +
    dbModels.anime.releasedateNOTNULL +
    ", " +
    dbModels.anime.synopsis +
    ", " +
    dbModels.anime.releaseseason +
    " ) VALUES ( '" +
    newTitle +
    "' , '" +
    releasedate +
    "' , '" +
    newSynopsis +
    "' , '" +
    releaseseason +
    "' ) RETURNING * ;";
  try {
    createdAnime = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Adding anime failed, please try again later", 500)
    );
  }

  if (createdAnime === false || createdAnime.rowCount === 0) {
    return next(
      new HttpError("Adding anime failed, please try again later", 500)
    );
  }
  const animeid = createdAnime.rows[0].animeid;

  //insert pic
  let picStatus = false,
    queryText4 =
      "INSERT INTO " +
      dbModels.tables.animepicture +
      " VALUES ( '" +
      filepath.split("\\")[2] +
      "' , " +
      animeid +
      ", " +
      true +
      " ) RETURNING *";

  try {
    picStatus = await db.query(queryText4);
  } catch (err) {
    return next(
      new HttpError("Adding anime picture failed, please try again later", 500)
    );
  }

  if (picStatus === false || picStatus.rowCount === 0) {
    return next(
      new HttpError("Adding anime picture failed, please try again later", 500)
    );
  }

  //insert genres
  let queryText5 = "";

  let newgenres = genres
    .replace(/[\[\]']+/g, "")
    .replace(/"/g, "")
    .split(",");

  newgenres.forEach(async (element) => {
    queryText5 =
      "INSERT INTO " +
      dbModels.tables.animeisofgenre +
      " VALUES ( " +
      animeid +
      ", '" +
      element.trim() +
      "' ) RETURNING * ;";

    genreStatus = false;

    try {
      genreStatus = await db.query(queryText5);
    } catch (err) {
      return next(
        new HttpError(
          "Added anime. Adding anime genre failed, please try again later",
          500
        )
      );
    }

    if (genreStatus === false || genreStatus.rowCount === 0) {
      return next(
        new HttpError(
          "Added anime. Adding anime genre failed, please try again later",
          500
        )
      );
    }
  });

  //insert studios
  let newStudios = studios
    .replace(/[\[\]']+/g, "")
    .replace(/"/g, "")
    .split(",");
    console.log(newStudios);
    console.log(studios);
  newStudios.forEach(async (element) => {
    queryText5 =
      "INSERT INTO " +
      dbModels.tables.animestudio +
      " VALUES ( " +
      animeid +
      ", '" +
      element.trim() +
      "' ) RETURNING * ;";

    studioStatus = false;

    try { 

      studioStatus = await db.query(queryText5);
    } catch (err) {
      return next(
        new HttpError(
          "Added anime and genre. Adding anime genre failed, please try again later",
          500
        )
      );
    }

    if (studioStatus === false || studioStatus.rowCount === 0) {
      return next(
        new HttpError(
          "Added anime and genre. Adding anime studio failed, please try again later",
          500
        )
      );
    }
  });

  //update all rankings now
  let updatedState = true;
  try {
    updatedState = await db.query("CALL update_animerank();");
  } catch (error) {
    return next(
      new HttpError(
        "Updating ranks of anime failed, please try again later",
        500,
        false
      )
    );
  }

  if (updatedState === false) {
    return next(
      new HttpError(
        "Updating ranks of anime failed, please try again later",
        500,
        false
      )
    );
  }

  res.status(201).json({
    success: true,
    animeid: animeid,
  });
};

const editAnime = async (req, res, next) => {};

const deleteAnime = async (req, res, next) => {
  const animeid = req.params.aid;
  let animeidstate = await check_animeid(animeid);
  if (animeidstate === 0) {
    return next(
      new HttpError(
        "Invalid animeid parameter provided, please check your url",
        422
      )
    );
  } else if (animeidstate === 2) {
    return next(
      new HttpError("Deleting anime failed, please try again later", 500)
    );
  }

  let queryText = "",
    deleteStatus = false;

  queryText =
    "DELETE FROM " +
    dbModels.tables.anime +
    " WHERE " +
    dbModels.anime.animeIDNOTNULL +
    " = '" +
    animeid +
    "' RETURNING *;";

  try {
    deleteStatus = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Deleting anime failed, please try again later", 500)
    );
  }

  if (deleteStatus === false || deleteStatus.rowCount === 0) {
    return next(
      new HttpError("Deleting anime failed, please try again later", 500)
    );
  }

  //update all rankings now
  let updatedState = true;
  try {
    updatedState = await db.query("CALL update_animerank();");
  } catch (error) {
    return next(
      new HttpError(
        "Updating ranks of anime failed, please try again later",
        500,
        false
      )
    );
  }

  if (updatedState === false) {
    return next(
      new HttpError(
        "Updating ranks of anime failed, please try again later",
        500,
        false
      )
    );
  }



  res.status(201).json({
    success: true,
    message: "Deleted Anime Successfully",
    deletedAnime: deleteStatus.rows[0],
  });
};

module.exports = {
  getAllAnime,
  getAnimeByID,
  getAllAnimePictures,
  getAllAnimeItems,
  addAnime,
  editAnime,
  deleteAnime,
};
