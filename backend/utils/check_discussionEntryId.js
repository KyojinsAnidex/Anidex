const dbModels = require("../models/db_models");
const db = require("../db/index");

module.exports = async (discussionEntryId) => {
  //is discussionEntryId valid
  isValidDiscussionEntryId = false;
  try {
    isValidDiscussionEntryId = await db.query(
      "SELECT $1 IN ( SELECT " +
        dbModels.discussionEntries.discussionEntryIdNOTNULL +
        " FROM " +
        dbModels.tables.discussionEntries +
        " ) AS isIn ;",
      [discussionEntryId]
    );
  } catch (err) {
    return 2;
  }

  if (isValidDiscussionEntryId === false) {
    return 2;
  }
  
  if (isValidDiscussionEntryId.rows[0].isin === false) {
    return 0;
  } else {
    return 1;
  }
};
