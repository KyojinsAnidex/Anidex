const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const HttpError = require("../../models/http_error");
const dbModels = require("../../models/db_models");

const common = require("../common_controllers/common");
const check_animeid = require("../../utils/check_animeid");
const check_tags = require("../../utils/check_tags");
const check_userid = require("../../utils/check_userid");
const check_discussionheadid = require("../../utils/check_discussionheadid");
const check_discussionEntryId = require("../../utils/check_discussionEntryId");

const getAllDiscussionTags = async (req, res, next) => {
  let tagData = false;
  let queryText = "SELECT * FROM get_tag_data();";
  try {
    tagData = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Failed to get tag data, please try again later", 500)
    );
  }

  if (tagData === false || tagData.rowCount === 0) {
    return next(
      new HttpError("Failed to get tag data, please try again later", 500)
    );
  }

  res.status(200).json({
    success: true,
    tagData: tagData.rows,
  });
};

const getSingleDiscussionTag = async (req, res, next) => {
  const tag = req.params.tagid;
  let tagStatus = await check_tags(tag);
  if (tagStatus === 0) {
    return next(
      new HttpError(
        "Invalid tag parameter provided, please check your url",
        422
      )
    );
  } else if (tagStatus === 2) {
    return next(
      new HttpError("Finding discussions failed, please try again later", 500)
    );
  }
  let resDiscussionHeads = false;
  let queryText = "";
  queryText = "SELECT * FROM get_tag_discussionheads('" + tag + "');";

  let animeids = false;
  if (tag === "Anime" || tag === "Watchroom" || tag === "Review") {
    let queryText2 =
      "SELECT * FROM get_animeid_tag_discussionheads('" + tag + "');";
    try {
      animeids = await db.query(queryText2);
    } catch (err) {
      return next(
        new HttpError(
          "Failed to get animeids of discussion heads for this tag, please try again later",
          500
        )
      );
    }
    if (animeids === false) {
      return next(
        new HttpError(
          "Failed to get animeids of discussion heads for this tag, please try again later",
          500
        )
      );
    }
    if (animeids.rowCount === 0) {
      return next(
        new HttpError(
          "No animeids of heads for this tag, please try again later",
          404
        )
      );
    }
  }

  try {
    resDiscussionHeads = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Failed to get discussion heads for this tag, please try again later",
        500
      )
    );
  }

  if (resDiscussionHeads === false) {
    return next(
      new HttpError(
        "Failed to get discussion heads for this tag, please try again later",
        500
      )
    );
  }

  res.status(200).json({
    success: true,
    allDiscussionHeads: resDiscussionHeads.rows,
    animeids: animeids.rows,
  });
};

const addDiscussionHeadToTag = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs for discussionhead were provided, please check your inputs",
        422
      )
    );
  }

  const { userid, content, tags, animeid } = req.body;
  let newUserid = userid.replace(/'/g, "''"),
    newContent = content.replace(/'/g, "''");

  let newanimeid;
  if (isNaN(animeid)) {
    newanimeid = 0;
  } else {
    newanimeid = animeid;
  }

  let useridstate = await check_userid(newUserid);
  if (useridstate === 0) {
    return next(
      new HttpError(
        "Invalid userid for discussionhead were provided, please check your inputs",
        422
      )
    );
  } else if (useridstate === 2) {
    return next(
      new HttpError("Adding discussion failed, please try again later", 500)
    );
  }

  let newTags;
  if (Array.isArray(tags)) {
    newTags = tags;
  } else {
    newTags = tags
      .replace(/[\[\]']+/g, "")
      .replace(/\s+/g, "")
      .replace(/"/g, "")
      .split(",");
  }
  let tagString = "{";
  let animeRelated = false;

  for (let i = 0; i < newTags.length; i++) {
    tagString += '"' + newTags[i] + '"';
    if (i < newTags.length - 1) {
      tagString += ",";
    }
    if (
      newTags[i] === "Anime" ||
      newTags[i] === "Review" ||
      newTags[i] === "Watchroom"
    ) {
      animeRelated = true;
    }
  }
  tagString += "}";

  if (animeRelated === true) {
    let animeidState = await check_animeid(animeid);
    if (animeidState === 0) {
      return next(
        new HttpError(
          "Invalid animeid inputs provided, please check your inputs",
          422
        )
      );
    } else if (animeidState === 2) {
      return next(
        new HttpError("Starting discussion failed, please try again later", 500)
      );
    }
  }

  let queryText =
    "SELECT * FROM insert_discussionhead_with_tag( '" +
    newContent +
    "' , '" +
    userid +
    "' , '" +
    newanimeid +
    "' , '" +
    tagString +
    "' ) ;";
  // console.log(queryText);

  let newDiscussionHead = false;

  try {
    newDiscussionHead = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError("Adding discussionhead failed, please try again later", 500)
    );
  }

  if (newDiscussionHead === false || newDiscussionHead.rowCount === 0) {
    return next(
      new HttpError("Adding discussionhead failed, please try again later", 500)
    );
  }

  res.status(201).json({
    success: true,
    newDiscussionHead: newDiscussionHead.rows[0],
  });
};

const getSingleDiscussion = async (req, res, next) => {
  const dhid = req.params.dhid;
  let discussion = false;
  let entries = false;
  let queryText = "SELECT * FROM get_single_discussionhead( '" + dhid + "' ) ;";
  let queryText2 =
    "SELECT * FROM get_all_discussionentries( '" + dhid + "' ) ;";

  try {
    discussion = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Error getting this discussion head, please try again later",
        500
      )
    );
  }
  if (discussion === false || discussion.rowCount === 0) {
    return next(
      new HttpError(
        "Error getting this discussion head, please try again later",
        500
      )
    );
  }
  try {
    entries = await db.query(queryText2);
  } catch (err) {
    return next(
      new HttpError(
        "Error getting this discussion head's entries, please try again later",
        500
      )
    );
  }
  if (entries === false) {
    return next(
      new HttpError(
        "Error getting this discussion head's entries, please try again later",
        500
      )
    );
  }
  res.status(200).json({
    success: true,
    discussionHead: discussion.rows[0],
    discussionEntries: entries.rows,
  });
};

const addDiscussionEntry = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs for discussionentry were provided, please check your inputs",
        422
      )
    );
  }

  const discussionheadId = req.params.dhid;
  const { userid, content } = req.body;
  let newUserid = userid.replace(/'/g, "''"),
    newContent = content.replace(/'/g, "''");

  let useridstate = await check_userid(newUserid),
    discussionHeadIdStatus = check_discussionheadid(discussionheadId);
  if (useridstate === 0 || discussionHeadIdStatus === 0) {
    return next(
      new HttpError(
        "Invalid userid or discussionhead id for discussionentry were provided, please check your inputs",
        422
      )
    );
  } else if (useridstate === 2 || discussionHeadIdStatus === 2) {
    return next(
      new HttpError("Adding discussion failed, please try again later", 500)
    );
  }

  let queryText =
    "SELECT * FROM insert_discussionentry( '" +
    newContent +
    "' , '" +
    userid +
    "' , '" +
    discussionheadId +
    "' ) ;";
  // console.log(queryText);

  let newDiscussionEntry = false;

  try {
    newDiscussionEntry = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Adding discussionentry failed, please try again later",
        500
      )
    );
  }

  if (newDiscussionEntry === false || newDiscussionEntry.rowCount === 0) {
    return next(
      new HttpError(
        "Adding discussionentry failed, please try again later",
        500
      )
    );
  }

  res.status(201).json({
    success: true,
    newDiscussionEntry: newDiscussionEntry.rows[0],
  });
};

const getAnimeDiscussions = async (req, res, next) => {
  const animeid = req.params.aid;
  let animeidstate = await check_animeid(animeid);
  if (animeidstate === 0) {
    return next(
      new HttpError(
        "Invalid animeid parameter provided, please check your url",
        422
      )
    );
  } else if (animeidstate === 2) {
    return next(
      new HttpError(
        "Finding this anime's discussions failed, please try again later",
        500
      )
    );
  }

  let reviewDiscussionHeads = false,
    watchroomDiscussionHeads = false,
    animeDiscussionHeads = false;
  let queryText = "SELECT * FROM get_anime_discussionheads('" + animeid + "');",
    queryText2 =
      "SELECT * FROM get_anime_review_discussionheads('" + animeid + "');",
    queryText3 =
      "SELECT * FROM get_anime_watchroom_discussionheads('" + animeid + "');";

  try {
    animeDiscussionHeads = await db.query(queryText);
    reviewDiscussionHeads = await db.query(queryText2);
    watchroomDiscussionHeads = await db.query(queryText3);
  } catch (err) {
    return next(
      new HttpError(
        "Error getting this anime's discussions, please try again later",
        500
      )
    );
  }
  if (
    animeDiscussionHeads === false ||
    watchroomDiscussionHeads === false ||
    reviewDiscussionHeads === false
  ) {
    return next(
      new HttpError(
        "Error getting this anime's discussions, please try again later",
        500
      )
    );
  }

  res.status(200).json({
    success: true,
    animeTagDiscussions: animeDiscussionHeads.rows,
    reviewTagDiscussions: reviewDiscussionHeads.rows,
    watchroomTagDiscussions: watchroomDiscussionHeads.rows,
  });
};

const voteDiscussionEntry = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs for discussionhead were provided, please check your inputs",
        422
      )
    );
  }

  const discussionEntryId = req.params.deid;
  const { vote } = req.body;

  let discussionEntryIdStatus = await check_discussionEntryId(
    discussionEntryId
  );
  if (discussionEntryIdStatus === 0) {
    return next(
      new HttpError(
        "Invalid userid or discussionhead id for discussionentry were provided, please check your inputs",
        422
      )
    );
  } else if (discussionEntryIdStatus === 2) {
    return next(
      new HttpError("Voting discussion failed, please try again later", 500)
    );
  }

  let add = 0;

  if (vote === true) {
    add = 1;
  } else {
    add = -1;
  }

  let queryText =
    "UPDATE " +
    dbModels.tables.discussionEntries +
    " SET " +
    dbModels.discussionEntries.votesNOTNULL +
    " = " +
    dbModels.discussionEntries.votesNOTNULL +
    " + " +
    add +
    " WHERE " +
    dbModels.discussionEntries.discussionEntryIdNOTNULL +
    " = '" +
    discussionEntryId +
    "' RETURNING *;";
  // console.log(queryText);

  let voteStatus = false;
  try {
    voteStatus = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Voting failed for this discussion entry, please try again",
        500
      )
    );
  }

  if (voteStatus === false || voteStatus.rowCount === 0) {
    return next(
      new HttpError(
        "Voting failed for this discussion entry, please try again",
        500
      )
    );
  }

  res.status(201).json({
    success: true,
    votedEntry: voteStatus.rows[0],
  });
};

const voteDiscussionHead = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs for discussionhead were provided, please check your inputs",
        422
      )
    );
  }

  const discussionHeadID = req.params.dhid;
  const { vote } = req.body;

  let discussionHeadIdStatus = await check_discussionheadid(discussionHeadID);
  if (discussionHeadIdStatus === 0) {
    return next(
      new HttpError(
        "Invalid userid or discussionhead id for discussionentry were provided, please check your inputs",
        422
      )
    );
  } else if (discussionHeadIdStatus === 2) {
    return next(
      new HttpError("Voting discussion failed, please try again later", 500)
    );
  }

  let add = 0;

  if (vote === true) {
    add = 1;
  } else {
    add = -1;
  }

  let queryText =
    "UPDATE " +
    dbModels.tables.discussionHead +
    " SET " +
    dbModels.discussionHead.votesNOTNULL +
    " = " +
    dbModels.discussionHead.votesNOTNULL +
    " + " +
    add +
    " WHERE " +
    dbModels.discussionHead.discussionHeadIdNOTNULL +
    " = '" +
    discussionHeadID +
    "' RETURNING *;";

  // console.log(queryText);

  let voteStatus = false;
  try {
    voteStatus = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Voting failed for this discussion head, please try again",
        500
      )
    );
  }

  if (voteStatus === false || voteStatus.rowCount === 0) {
    return next(
      new HttpError(
        "Voting failed for this discussion head, please try again",
        500
      )
    );
  }

  res.status(201).json({
    success: true,
    votedEntry: voteStatus.rows[0],
  });
};

const deleteDiscussionHead = async (req, res, next) => {
  const discussionHeadid = req.params.dhid;
  let discussionIdState = await check_discussionheadid(discussionHeadid);

  if (discussionIdState === 0) {
    return next(
      new HttpError(
        "Invalid discussion Head id parameter provided, please check your url",
        422
      )
    );
  } else if (discussionIdState === 2) {
    return next(
      new HttpError(
        "Deleting discussion head failed, please try again later",
        500
      )
    );
  }

  let entry = false;

  try {
    entry = await db.query(
      "SELECT * FROM " +
        dbModels.tables.discussionHead +
        " WHERE " +
        dbModels.discussionHead.discussionHeadIdNOTNULL +
        " = '" +
        discussionHeadid +
        "' ;"
    );
  } catch (err) {
    return next(
      new HttpError(
        "Deleting discussion head failed, please try again later",
        500
      )
    );
  }

  if (entry === false || entry.rowCount === 0) {
    return next(
      new HttpError(
        "Deleting discussion head failed, please try again later",
        500
      )
    );
  }

  let userid = entry.rows[0].userid;
  // console.log(req.userData.discussionHeadid);
  if (req.userData.userId != userid) {
    return next(new HttpError("User trying to delete another user's discussion", 403));
  }

  let queryText = "",
    deleteStatus = false;

  queryText =
    "DELETE FROM " +
    dbModels.tables.discussionHead +
    " WHERE " +
    dbModels.discussionHead.discussionHeadIdNOTNULL +
    " = '" +
    discussionHeadid +
    "' RETURNING *;";

  try {
    deleteStatus = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Deleting discussion head failed, please try again later",
        500
      )
    );
  }

  if (deleteStatus === false || deleteStatus.rowCount === 0) {
    return next(
      new HttpError(
        "Deleting discussion head failed, please try again later",
        500
      )
    );
  }

  res.status(201).json({
    success: true,
    deletedEntry: deleteStatus.rows[0],
  });
};

const deleteDiscussionEntry = async (req, res, next) => {
  const discussionEntryId = req.params.deid;
  let discussionEntryIdState = await check_discussionEntryId(discussionEntryId);

  if (discussionEntryIdState === 0) {
    return next(
      new HttpError(
        "Invalid discussion entry id parameter provided, please check your url",
        422
      )
    );
  } else if (discussionEntryIdState === 2) {
    return next(
      new HttpError(
        "Deleting discussion entry failed, please try again later",
        500
      )
    );
  }

  let entry = false;

  try {
    entry = await db.query(
      "SELECT * FROM " +
        dbModels.tables.discussionEntries +
        " WHERE " +
        dbModels.discussionEntries.discussionEntryIdNOTNULL +
        " = '" +
        discussionEntryId +
        "' ;"
    );
  } catch (err) {
    return next(
      new HttpError(
        "Deleting discussion entry failed, please try again later",
        500
      )
    );
  }

  if (entry === false || entry.rowCount === 0) {
    return next(
      new HttpError(
        "Deleting discussion entry failed, please try again later",
        500
      )
    );
  }

  let userid = entry.rows[0].userid;
  // console.log(req.userData.userId);
  if (req.userData.userId != userid) {
    return next(
      new HttpError("User trying to delete another user's entry", 403)
    );
  }

  let queryText = "",
    deleteStatus = false;

  queryText =
    "DELETE FROM " +
    dbModels.tables.discussionEntries +
    " WHERE " +
    dbModels.discussionEntries.discussionEntryIdNOTNULL +
    " = '" +
    discussionEntryId +
    "' RETURNING *;";

  try {
    deleteStatus = await db.query(queryText);
  } catch (err) {
    return next(
      new HttpError(
        "Deleting discussion entry failed, please try again later",
        500
      )
    );
  }

  if (deleteStatus === false || deleteStatus.rowCount === 0) {
    return next(
      new HttpError(
        "Deleting discussion entry failed, please try again later",
        500
      )
    );
  }

  res.status(201).json({
    success: true,
    deletedEntry: deleteStatus.rows[0],
  });
};

module.exports = {
  getAllDiscussionTags,
  getSingleDiscussionTag,
  addDiscussionEntry,
  addDiscussionHeadToTag,
  getSingleDiscussion,
  getAnimeDiscussions,
  voteDiscussionEntry,
  voteDiscussionHead,
  deleteDiscussionHead,
  deleteDiscussionEntry,
};
