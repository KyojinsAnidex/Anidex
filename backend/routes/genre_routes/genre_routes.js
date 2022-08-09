const express = require("express");
const { check } = require("express-validator");

const { genreControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");

const router = express.Router();

router.get("/", genreControllers.getAllGenre);

router.post("/anime", genreControllers.getGenreAnime);

router.use(check_auth);

router.post("/", [check("genre").not().isEmpty()], genreControllers.addGenre);

module.exports = router;
