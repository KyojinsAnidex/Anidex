const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModel = require("../../models/db_models");

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
        email +
        "'"
    );
  } catch (err) {
    return next(
      new HttpError("Loggin in user failed, please try again later.", 500)
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
      new HttpError("Invalid credentials, could not log you in.", 403)
    );
  }

  let token;
  try {
    token = jwt.sign({ userId: name, email: email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
  } catch (err) {
    return next(
      new HttpError("Logging in user failed, please try again later.", 500)
    );
  }

  res.status(200).json({
    success: true,
    userid: name,
    email: email,
    token: token,
  });
};

const signupUser = async (req, res, next) => {
  // Temporarily off for now, router e lekha baki
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { email, password, name, bio } = req.body;
  // const pictureid = req.file.path;

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
      [name, email]
    );
  } catch (err) {
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
    " ) VALUES ( '" +
    email +
    "' , '" +
    hashedPassword +
    "' , '" +
    name +
    "' , '" +
    bio +
    "' ) RETURNING *";
  try {
    createdUser = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Signing up user failed, please try again later.", 500)
    );
  }

  if (createdUser.rowCount === 0) {
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
  });
};

module.exports = {
  getAllUsers,
  getUserByID,
  loginUser,
  signupUser,
};
