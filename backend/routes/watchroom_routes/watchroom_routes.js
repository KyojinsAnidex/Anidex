const express = require("express");
const { check } = require("express-validator");

const { watchroomControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");

const router = express.Router();

router.get("/", watchroomControllers.getAllWatchroom);

router.get("/:watchroomid", watchroomControllers.getSingleWatchroom);

router.get("/participants/:watchroomid", watchroomControllers.getParticipants);

router.use(check_auth);

router.post(
  "/",
  [
    check("watchroomname").not().isEmpty(),
    check("animeid").not().isEmpty(),
    check("animeid").isNumeric(),
  ],
  watchroomControllers.makeWatchroom
);

router.post(
  "/participants/:watchroomid",
  [check("userid").not().isEmpty()],
  watchroomControllers.addParticipants
);

module.exports = router;
