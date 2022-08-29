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

router.use(check_auth);

router.post("/tags/:tagid", discussionControllers.addDiscussionHeadToTag);

router.post("/discussionhead/:dhid", discussionControllers.addDiscussionEntry);

module.exports = router;
