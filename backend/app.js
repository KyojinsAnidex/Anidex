const path = require("path");
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.port || 5000;

const db = require('./db/index');

const app = express();

app.use(bodyParser.json());

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

app.get('/', async (req, res) => {
    try {
        
        const result = await db.query('SELECT * FROM anime');
        res.status(200).json({ans: result.rows});
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
  console.log("Server listenning on port " + port);
});
