const express = require("express");
const { check } = require("express-validator");

const { watchlistControllers } = require("../../controllers/index");
const check_auth = require("../../middlewares/check_auth");

const router = express.Router();

router.get(
  "/:uid",

  watchlistControllers.getWatchlistOfUser
);

// //protected routes
router.use(check_auth);

router.post(
  "/:uid",
  [
    check("animeid").not().isEmpty(),
    check("animeid").isNumeric(),
    check("favourite").not().isEmpty()
  ],
  watchlistControllers.addAnimeToWatchlist
);

// router.delete('/:uid', watchlistControllers.deleteAnimeFromWatchlist);

module.exports = router;
