const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { unlink } = require("fs");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModel = require("../../models/db_models");
const check_userid = require("../../utils/check_userid");

const getAllUsers = async (req, res, next) => {
  let allUsers;

  let queryText =
    "SELECT " +
    dbModel.users.userIDNOTNULL +
    ", " +
    dbModel.users.mailNOTNULL +
    ", " +
    dbModel.users.bio +
    ", " +
    dbModel.users.pictureNOTNULL +
    ", " +
    dbModel.users.admin +
    " FROM " +
    dbModel.tables.users +
    ";";

  try {
    allUsers = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }

  if (allUsers === false) {
    return next(
      new HttpError("Fetching users failed, please try again later", 500)
    );
  }

  if (allUsers.rowCount > 0) {
    res.status(200).json({
      success: true,
      results: allUsers.rows,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No users found",
    });
  }
};

const getUserByID = async (req, res, next) => {
  let userID = req.params.uid;
  userID = userID.replace(/'/g, "''");

  let searchedUser;

  let queryText =
    "SELECT " +
    dbModel.users.userIDNOTNULL +
    ", " +
    dbModel.users.mailNOTNULL +
    ", " +
    dbModel.users.bio +
    ", " +
    dbModel.users.pictureNOTNULL +
    ", " +
    dbModel.users.admin +
    " FROM " +
    dbModel.tables.users +
    " WHERE " +
    dbModel.users.userIDNOTNULL +
    " = $1";

  try {
    searchedUser = await db.query(queryText, [userID]);
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  if (searchedUser === false) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  if (searchedUser.rowCount != 0) {
    res.status(200).json({
      success: true,
      user: searchedUser.rows[0],
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No user with provided userID",
    });
  }
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input provided, please check your inputs", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await db.query(
      "SELECT * FROM " +
        dbModel.tables.users +
        " WHERE " +
        dbModel.users.mailNOTNULL +
        " = " +
        "'" +
        email.replace(/'/g, "''") +
        "'"
    );
  } catch (err) {
    return next(
      new HttpError(
        "Logging in user failed, please try again later. Had problem running a query in database",
        500
      )
    );
  }
  if (existingUser === false) {
    return next(
      new HttpError(
        "Logging in user failed, please try again later. Running the query yielded a false result",
        500
      )
    );
  }

  if (existingUser.rowCount === 0) {
    return next(
      new HttpError("Invalid credentials, could not log you in", 401)
    );
  }

  //password check
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(
      password,
      existingUser.rows[0].security_key
    );
  } catch (err) {
    return next(
      new HttpError(
        "Logging in user failed, please check your credentials and try again.",
        500
      )
    );
  }

  // if (existingUser.rows[0].security_key === password) {
  //   isValidPassword = true;
  // }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: name.replace(/'/g, "''"), email: email.replace(/'/g, "''") },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    return next(
      new HttpError(
        "Logging in user failed, please try again later. JWT token making failed",
        500
      )
    );
  }

  res.status(200).json({
    success: true,
    userid: name,
    email: email,
    token: token,
    admin: existingUser.rows[0].admin,
  });
};

const signupUser = async (req, res, next) => {
  // Temporarily off for now, router e lekha baki
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data 1.", 422)
    );
  }

  const { email, password, name, bio } = req.body;
  if (!req.file) {
    return next(
      new HttpError("Invalid inputs passed, please check your data 1.", 422)
    );
  }
  const pictureid = req.file.path.split("\\")[2];

  //is user already in db?
  let existingUser;
  try {
    existingUser = await db.query(
      "SELECT * FROM " +
        dbModel.tables.users +
        " WHERE " +
        dbModel.users.userIDNOTNULL +
        " = $1 OR " +
        dbModel.users.mailNOTNULL +
        " = $2",
      [name.replace(/'/g, "''"), email.replace(/'/g, "''")]
    );
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }
  if (existingUser === false) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (existingUser.rowCount > 0) {
    return next(
      new HttpError("User exists already, please login instead.", 422)
    );
  }

  //insert user in db 🤲
  //hash password
  let hashedPassword = password;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  //real insert
  let createdUser;
  let queryText =
    "INSERT INTO " +
    dbModel.tables.users +
    " (" +
    dbModel.users.mailNOTNULL +
    ", " +
    dbModel.users.passwordNOTNULL +
    ", " +
    dbModel.users.userIDNOTNULL +
    ", " +
    dbModel.users.bio +
    ", " +
    dbModel.users.pictureNOTNULL +
    " ) VALUES ( '" +
    email.replace(/'/g, "''") +
    "' , '" +
    hashedPassword +
    "' , '" +
    name.replace(/'/g, "''") +
    "' , '" +
    bio.replace(/'/g, "''") +
    "' , '" +
    pictureid +
    "' ) RETURNING *";
  try {
    createdUser = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Signing up user failed, please try again later.", 500)
    );
  }
  if (createdUser === false || createdUser.rowCount === 0) {
    return next(
      new HttpError("Signing up user failed, please try again later.", 500)
    );
  }

  //jwt part, will be in response may use later
  let token;
  try {
    token = jwt.sign({ userId: name, email: email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
  } catch (err) {
    return next(
      new HttpError("Signing up user failed, please try again later.", 500)
    );
  }

  res.status(201).json({
    success: true,
    userid: name,
    email: email,
    token: token,
    admin: createdUser.rows[0].admin,
  });
};

const editUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data 1.", 422)
    );
  }

  const { email, password, name, bio, newUserid } = req.body;

  // if (req.userData && req.userData.userId != name) {
  //   console.log(req + " " + name);
  //   return next(new HttpError("User trying to change other users data.", 403));
  // }

  if (req.userData.userId != name.replace(/'/g, "''")) {
    return next(new HttpError("User trying to edit another user", 403));
  }

  if (!req.file) {
    return next(
      new HttpError("Invalid inputs passed, please check your data 2.", 422)
    );
  }
  const pictureid = req.file.path.split("\\")[2];

  let useridState = await check_userid(name.replace(/'/g, "''"));

  if (useridState === 0) {
    return next(
      new HttpError(
        "Invalid userid input provided, please check your inputs",
        422
      )
    );
  } else if (useridState === 2) {
    return next(
      new HttpError("Editing user failed, please try again later", 500)
    );
  }

  //hash password
  let hashedPassword = password;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not edit user, please try again.", 500));
  }

  //so user ase, then update it is
  let queryText =
    "UPDATE " +
    dbModel.tables.users +
    " SET " +
    dbModel.users.userIDNOTNULL +
    " = '" +
    newUserid.replace(/'/g, "''") +
    "', " +
    dbModel.users.passwordNOTNULL +
    " = '" +
    hashedPassword +
    "' , " +
    dbModel.users.mailNOTNULL +
    " = '" +
    email.replace(/'/g, "''") +
    "' , " +
    dbModel.users.bio +
    " = '" +
    bio.replace(/'/g, "''") +
    "' , " +
    dbModel.users.pictureNOTNULL +
    " = '" +
    pictureid +
    "' WHERE " +
    dbModel.users.userIDNOTNULL +
    " = '" +
    name.replace(/'/g, "''") +
    "' RETURNING * ;";
  let updateStatus = false;

  try {
    updateStatus = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Editing user failed, please try again later. Had problem running a query in database",
        500
      )
    );
  }

  if (updateStatus === false || updateStatus.rowCount === 0) {
    return next(
      new HttpError(
        "Editing user failed, please try again later. Had problem running a query in database",
        500
      )
    );
  }

  res.status(201).json({
    success: true,
    userid: updateStatus.rows[0].userid,
    user: updateStatus.rows[0],
  });
};

const deleteUser = async (req, res, next) => {
  const userid = req.params.uid;
  let useridState = await check_userid(userid);

  if (useridState === 0) {
    return next(
      new HttpError(
        "Invalid userid parameter provided, please check your url",
        422
      )
    );
  } else if (useridState === 2) {
    return next(
      new HttpError("Deleting user failed, please try again later", 500)
    );
  }

  // console.log(req.userData.userId);
  if (req.userData.userId != userid) {
    return next(new HttpError("User trying to delete another user", 403));
  }

  let queryText = "",
    deleteStatus = false;

  queryText =
    "DELETE FROM " +
    dbModel.tables.users +
    " WHERE " +
    dbModel.users.userIDNOTNULL +
    " = '" +
    userid +
    "' RETURNING *;";

  try {
    deleteStatus = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Deleting user failed, please try again later", 500)
    );
  }

  if (deleteStatus === false || deleteStatus.rowCount === 0) {
    return next(
      new HttpError("Deleting user failed, please try again later", 500)
    );
  }

  //delete pic
  unlink(path.join("./uploads/images", deleteStatus.rows[0].pictureid), (err) => {
    if (err)
      console.log("ERROR DELETING USER PICTURE AFTER USER DELETION\n" + err);
  });

  res.status(201).json({
    success: true,
    message: "Deleted User Successfully",
    deletedUser: deleteStatus.rows[0],
  });
};

module.exports = {
  getAllUsers,
  getUserByID,
  loginUser,
  signupUser,
  editUser,
  deleteUser,
};
