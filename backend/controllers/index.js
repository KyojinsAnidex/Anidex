const animeControllers = require("./anime_controllers/anime_controllers");
const userControllers = require("./users_controllers/users_controllers");
const watchlistControllers = require("./watchlist_controllers/watchlist_controllers");
const searchControllers = require("./search_controllers/search_controllers");
const characterControllers = require("./character_controllers/character_controllers");
const personnelControllers = require("./personnel_controllers/personnel_controllers");
const genreControllers = require("./genre_controllers/genre_controllers");
const watchroomControllers = require("./watchroom_controllers/watchroom_controllers");
const reviewControllers = require("./review_controllers/review_controllers");
const episodesControllers = require("./episodes_controller/episodes_controllers");
const studioControllers = require("./studio_controllers/studio_controllers");
const animeRatingControllers = require("./animerating_controllers/animerating_controllers");
const episodeRatingControllers = require("./episodeRating_controllers/episodeRating_controllers");

module.exports = {
  animeControllers,
  userControllers,
  watchlistControllers,
  searchControllers,
  characterControllers,
  personnelControllers,
  genreControllers,
  watchroomControllers,
  reviewControllers,
  episodesControllers,
  studioControllers,
  animeRatingControllers,
  episodeRatingControllers,
};
