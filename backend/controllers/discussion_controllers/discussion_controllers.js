const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");
const check_animeid = require("../../utils/check_animeid");
const check_userid = require("../../utils/check_userid");

const getAllDiscussionTags = async (req, res, next) => {};

const getSingleDiscussionTag = async (req, res, next) => {};

const addDiscussionHeadToTag = async (req, res, next) => {};

const getSingleDiscussion = async (req, res, next) => {};

const addDiscussionEntry = async (req, res, next) => {};

module.exports = {
  getAllDiscussionTags,
  getSingleDiscussionTag,
  addDiscussionEntry,
  addDiscussionHeadToTag,
  getSingleDiscussion,
};
