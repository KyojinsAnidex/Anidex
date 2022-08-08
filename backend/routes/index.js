// import all routes files as constants
// e.g.
const animeRoutes = require("./anime_routes/anime_route");
const searchRoutes = require("./search_routes/search_route");
const usersRoutes = require("./users_routes/user_routes");
const watchlistRoutes = require("./watchlist_routes/watchlist_routes");
//export them
module.exports = (app) => {
  //use the app.use method to register routers here
  //e.g.
  // app.use('/api/places', placesRoutes);
  app.use("/anime", animeRoutes);
  app.use("/search", searchRoutes);
  app.use("/users", usersRoutes);
  app.use("/watchlist", watchlistRoutes);
};
