const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");

const getAllPerson = async (req, res, next) => {};

const getSinglePerson = async (req, res, next) => {};

const addPerson = async (req, res, next) => {};

module.exports = {
  getAllPerson,
  getSinglePerson,
  addPerson,
};
