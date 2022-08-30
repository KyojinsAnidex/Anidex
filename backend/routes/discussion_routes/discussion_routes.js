const express = require("express");
const { check } = require("express-validator");

const { discussionControllers } = require("../../controllers/index");
const check_admin = require("../../middlewares/check_admin");
const check_auth = require("../../middlewares/check_auth");
const fileUpload = require("../../middlewares/file_upload");

const router = express.Router();

router.get("/tags", discussionControllers.getAllDiscussionTags);

router.get("/tags/:tagid", discussionControllers.getSingleDiscussionTag);

router.get("/discussionhead/:dhid", discussionControllers.getSingleDiscussion);

router.get("/anime/:aid", discussionControllers.getAnimeDiscussions);

router.use(check_auth);

router.post(
  "/discussionhead",
  [check(["content", "userid", "tags"]).not().isEmpty()],
  discussionControllers.addDiscussionHeadToTag
);

router.post(
  "/discussionhead/:dhid",
  [check(["content", "userid"]).not().isEmpty()],
  discussionControllers.addDiscussionEntry
);

router.patch(
  "/discussionhead/:dhid",
  [check("vote").not().isEmpty()],
  discussionControllers.voteDiscussionHead
);

router.delete(
  "/discussionhead/:dhid",
  discussionControllers.deleteDiscussionHead
);

router.post(
  "/discussionentry/:deid",
  [check("vote").not().isEmpty()],
  discussionControllers.voteDiscussionEntry
);

router.delete(
  "/discussionentry/:deid",
  discussionControllers.deleteDiscussionEntry
);

module.exports = router;
