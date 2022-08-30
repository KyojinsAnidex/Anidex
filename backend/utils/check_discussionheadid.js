const dbModels = require("../models/db_models");
const db = require("../db/index");

module.exports = async (discussionHeadID) => {
  //is discussionHeadID valid
  isValidDiscussionHeadId = false;
  try {
    isValidDiscussionHeadId = await db.query(
      "SELECT $1 IN ( SELECT " +
        dbModels.discussionHead.discussionHeadIdNOTNULL +
        " FROM " +
        dbModels.tables.discussionHead +
        " ) AS isIn ;",
      [discussionHeadID]
    );
  } catch (err) {
    return 2;
  }

  if (isValidDiscussionHeadId === false) {
    return 2;
  }
  
  if (isValidDiscussionHeadId.rows[0].isin === false) {
    return 0;
  } else {
    return 1;
  }
};
