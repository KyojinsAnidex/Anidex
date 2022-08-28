const dbModels = require("../models/db_models");
const db = require("../db/index");

module.exports = async (userid) => {
    isValidUserid = false;
  try {
    isValidUserid = await db.query(
      "SELECT $1 IN ( SELECT " +
        dbModels.users.userIDNOTNULL +
        " FROM " +
        dbModels.tables.users +
        " ) AS isIn ;",
      [userid]
    );
  } catch (err) {
    return 2;
  }

  if (isValidUserid === false) {
    return 2;
  }
  
  if (isValidUserid.rows[0].isin === false) {
    return 0;
  } else {
    return 1;
  }
};
