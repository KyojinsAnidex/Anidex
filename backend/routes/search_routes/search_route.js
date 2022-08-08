const express = require("express");
const { check } = require("express-validator");

// const {searchControllers} = require('../../controllers/index');
const { searchControllers } = require("../../controllers/index");
// const check_auth = require("../../middlewares/check_auth");
const router = express.Router();

// router.all('/', );

router.post("/anime", searchControllers.getAnimeByName);

router.post("/users", searchControllers.getUserByName);

router.post("/characters", searchControllers.getCharByName);

router.post("/personnel", searchControllers.getPersonnelByName);

router.post("/studio", searchControllers.getStudioByName);

router.post("/episodes", searchControllers.getEpisodeByName);

module.exports = router;