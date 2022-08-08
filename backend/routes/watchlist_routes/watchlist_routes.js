const express = require('express');
const {check} = require('express-validator');

const {watchlistControllers} = require('../../controllers/index');
const check_auth = require('../../middlewares/check_auth');

const router = express.Router();

router.get('/:uid', watchlistControllers.getWatchlistOfUser);

// //protected routes
// router.use(check_auth);

// router.post('/:uid', );

// //protected Admin
// router.delete('/:uid',);

module.exports = router;