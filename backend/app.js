require("dotenv").config();

const path = require("path");
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");

const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = YAML.load("./docs/api.yml");

const port = process.env.port || 5000;

const HttpError = require("./models/http_error");

const mountRouter = require("./routes/index");

const app = express();

app.use(bodyParser.json());

// serve static images
app.use("/uploads/images", express.static(path.join("uploads", "images")));

// probably better than cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// routers mounted
mountRouter(app);

// swagger docs
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// No route found error
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

/**
 * General Http error message for a server side error,
 * deletes associated file as this req could not be processed
 */
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      // console.log("ERROR UNLINKING FILE FROM FAILED REQUEST\n" + err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  // console.log(req.body);
  // console.log(error.message);
  const status = error.code || 500;
  res.status(status);
  res.json({ message: error.message || "An unknown error occurred!" });
});

/**
 * Server starts
 */
app.listen(port, () => {
  console.log("Server listenning on port " + port);
});
