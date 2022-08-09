const db = require('../../db/index');
const dbModel = require('../../models/db_models');

const getAllFromTable = async (req, res, next, searchingTable, searchingName) => {
  let allRes;

  let queryText = "SELECT * FROM " +  searchingTable + ";";

  try {
    allRes = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Fetching all " + searchingName + " failed, please try again later.", 500)
    );
  }

  if (allRes.rowCount > 0) {
    res.status(200).json({
      success: true,
      results: allRes.rows,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No "+ searchingName +" found",
    });
  }
};

module.exports = {
    getAllFromTable
};