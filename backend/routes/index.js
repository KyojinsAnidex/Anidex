// import all routes files as constants
// e.g.
const animeRoutes = require("./anime_routes/anime_route");
const searchRoutes = require("./search_routes/search_route");
const usersRoutes = require("./users_routes/user_routes");
const watchlistRoutes = require("./watchlist_routes/watchlist_routes");
const charactersRoutes = require("./character_routes/character_routes");
const personnelRoutes = require("./personnel_routes/personnel_routes");
const genreRoutes = require("./genre_routes/genre_routes");

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
};
