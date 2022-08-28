const db = require("../../db/index");
const dbModel = require("../../models/db_models");
const HttpError = require("../../models/http_error");

const getAllFromTable = async (
  req,
  res,
  next,
  searchingTable,
  searchingName
) => {
  let allRes;

  let queryText;
  queryText = "SELECT * FROM " + searchingTable;
  if (searchingName === "anime") {
    queryText += " ORDER BY " + dbModel.anime.animerank + " ASC ";
  }
  queryText += " ;";

  try {
    allRes = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Fetching all " + searchingName + " failed, please try again later.",
        500
      )
    );
  }
  if (allRes === false) {
    return next(
      new HttpError(
        "Fetching all " + searchingName + " failed, please try again later.",
        500
      )
    );
  }
  if (searchingName === "anime") {
    let allAnimeGenres = [];
    let totalAnime = allRes.rows.length;
    //for each anime find its genre, add to allAnimeGenres
    for (let i = 0; i < totalAnime; i++) {
      let thisAnimeGenre = false;
      try {
        thisAnimeGenre = await db.query(
          "SELECT * " +
            // dbModel.animeisofgenre.genreNameNOTNULL +
            " FROM " +
            dbModel.tables.animeisofgenre +
            " WHERE " +
            dbModel.animeisofgenre.animeIDNOTNULL +
            " = " +
            allRes.rows[i].animeid +
            "; "
        );
      } catch (err) {
        return next(
          new HttpError(
            "Failed to get genre for anime, please try again later",
            500,
            false
          )
        );
      }

      allAnimeGenres.push(thisAnimeGenre.rows);
    }
    if (allRes.rowCount === 0 || allAnimeGenres.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "No Anime found",
      });
    } else {
      res.status(200).json({
        success: true,
        results: allRes.rows,
        animegenres: allAnimeGenres,
      });
    }
  } else if (searchingName === "personnel") {
    let allAnimeStaffWork = [];
    let totalPerson = allRes.rows.length;
    //for each person find her/his anime, add to allAnimeStaffWork
    for (let i = 0; i < totalPerson; i++) {
      let thisPersonAnime = false;
      try {
        thisPersonAnime = await db.query(
          "SELECT * " +
            // dbModel.animeisofgenre.genreNameNOTNULL +
            " FROM " +
            dbModel.tables.animestaff +
            " WHERE " +
            dbModel.animestaff.personnelID +
            " = " +
            allRes.rows[i].personnelid +
            "; "
        );
      } catch (err) {
        return next(
          new HttpError(
            "Failed to get anime for person, please try again later",
            500,
            false
          )
        );
      }

      allAnimeStaffWork.push(thisPersonAnime.rows);
    }

    if (allRes.rowCount === 0 || allAnimeStaffWork.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "No personnel found",
      });
    } else {
      res.status(200).json({
        success: true,
        personnels: allRes.rows,
        allAnimeStaffWork: allAnimeStaffWork,
      });
    }
  } else {
    if (allRes.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "No " + searchingName + " found",
      });
    } else {
      res.status(200).json({
        success: true,
        results: allRes.rows,
      });
    }
  }
};

module.exports = {
  getAllFromTable,
};
