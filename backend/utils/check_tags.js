const dbModels = require("../models/db_models");
const db = require("../db/index");

module.exports = async (tagid) => {
  isValidTag = false;
  try {
    isValidTag = await db.query(
      "SELECT $1 IN ( SELECT " +
        dbModels.tagCloud.tagNameNOTNULL +
        " FROM " +
        dbModels.tables.tagCloud +
        " ) AS isIn ;",
      [tagid]
    );
  } catch (err) {
    return 2;
  }

  if (isValidTag === false) {
    return 2;
  }

  if (isValidTag.rows[0].isin === false) {
    return 0;
  } else {
    return 1;
  }
};
