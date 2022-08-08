const express = require('express');
const {check} = require('express-validator');

const {animeControllers}= require('../../controllers/index');
const check_auth = require('../../middlewares/check_auth');
const fileUpload = require('../../middlewares/file_upload');

const router = express.Router();

router.get('/', animeControllers.getAllAnime);

router.get('/pictures/:aid', animeControllers.getAllAnimePictures);

router.get('/items/:aid', animeControllers.getAllAnimeItems);
// router.get('/studios/:aid',);

// router.get('/characters/:aid',);

// router.get('/personnel/:aid',);

// router.get('/genre/:aid',);

router.get('/:aid', animeControllers.getAnimeByID);

// router.use(check_auth);

//protected
// router.post('/', );


// //protected
// router.patch('/:aid',);

// //protected Admin
// router.delete('/:aid',);

module.exports = router;