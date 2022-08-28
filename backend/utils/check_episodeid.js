const dbModels = require("../models/db_models");
const db = require("../db/index");

module.exports = async (episodeid) => {
    isValidEpisodeid = false;
  try {
    isValidEpisodeid = await db.query(
      "SELECT $1 IN ( SELECT " +
        dbModels.episode.episodeidNOTNULL +
        " FROM " +
        dbModels.tables.episode +
        " ) AS isIn ;",
      [episodeid]
    );
  } catch (err) {
    return 2;
  }

  if (isValidEpisodeid === false) {
    return 2;
  }
  
  if (isValidEpisodeid.rows[0].isin === false) {
    return 0;
  } else {
    return 1;
  }
};
