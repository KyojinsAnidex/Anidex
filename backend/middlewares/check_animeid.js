const dbModels = require("../models/db_models");
const db = require("../db/index");

module.exports = async (animeid) => {
  //is animeid valid
  isValidAnimeid = false;
  try {
    isValidAnimeid = await db.query(
      "SELECT $1 IN ( SELECT " +
        dbModels.anime.animeIDNOTNULL +
        " FROM " +
        dbModels.tables.anime +
        " ) AS isIn ;",
      [animeid]
    );
  } catch (err) {
    return 2;
  }

  if (isValidAnimeid === false) {
    return 2;
  }
  
  if (isValidAnimeid.rows[0].isin === false) {
    return 0;
  } else {
    return 1;
  }
};
