// import all routes files as constants
// e.g.
const animeRoutes = require("./anime_routes/anime_route");
const searchRoutes = require("./search_routes/search_route");
const usersRoutes = require("./users_routes/user_routes");
const watchlistRoutes = require("./watchlist_routes/watchlist_routes");
const charactersRoutes = require("./character_routes/character_routes");
const personnelRoutes = require("./personnel_routes/personnel_routes");
const genreRoutes = require("./genre_routes/genre_routes");
const watchroomRoutes = require("./watchroom_routes/watchroom_routes");
const reviewRoutes = require("./review_routes/review_routes");
const episodeRoutes = require("./episodes_routes/episodes_routes");
const studioRoutes = require("./studio_routes/studio_routes");
const animeRatingRoutes = require("./animerating_routes/animerating_routes");
const episodeRatingRoutes = require("./episodeRating_routes/episodeRating_routes");
const discussionRoutes = require("./discussion_routes/discussion_routes");

//export a method to add all routes to app parameter
module.exports = (app) => {
  //use the app.use method to register routers here
  //e.g.
  // app.use('/api/places', placesRoutes);
  app.use("/anime", animeRoutes);
  app.use("/characters", charactersRoutes);
  app.use("/search", searchRoutes);
  app.use("/users", usersRoutes);
  app.use("/watchlist", watchlistRoutes);
  app.use("/personnel", personnelRoutes);
  app.use("/genre", genreRoutes);
  app.use("/watchroom", watchroomRoutes);
  app.use("/reviews", reviewRoutes);
  app.use("/episodes", episodeRoutes);
  app.use("/studios", studioRoutes);
  app.use("/animerating", animeRatingRoutes);
  app.use("/episoderating", episodeRatingRoutes);
  app.use("/discussion", discussionRoutes);
};
