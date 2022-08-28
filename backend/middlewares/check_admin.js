require("dotenv").config();

const jwt = require("jsonwebtoken");

const HttpError = require("../models/http_error");
const db = require("../db/index");
const dbModels = require("../models/db_models");

/**
 * JWT token authentication
 * req must have in header:  Authorization: 'Bearer TOKEN'
 * TOKEN will be sent by server and sent back by client
 */
module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.jwt_key);

    //this adds userData.userId field to req with userID from token, we will also probably follow this
    // check if this user is admin
    isAdmin = false;
    try {
      isAdmin = await db.query(
        "SELECT " +
          dbModels.users.admin +
          " FROM " +
          dbModels.tables.users +
          " WHERE " +
          dbModels.users.userIDNOTNULL +
          " = '" +
          decodedToken.userId.replace(/'/g, "''") +
          "' ;"
      );
    } catch (err) {
      throw new Error("Admin authentication failed!");
    }

    if (
      isAdmin === false ||
      isAdmin.rowCount === 0 ||
      isAdmin.rows[0].admin === false
    ) {
      throw new Error("Admin authentication failed!");
    }

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Failure to verify admin", 403);
    return next(error);
  }
};
