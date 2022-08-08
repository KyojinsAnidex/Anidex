require("dotenv").config();

const fs = require("fs");

const { Pool } = require("pg");

// create db connection pool
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.database_port,
});

//serving a query
const query = async (text, params) => {
  try {
    const start = Date.now();

    //serve and store res, it will have query results at res.rows property
    const res = await pool.query(text, params);

    const duration = Date.now() - start;

    //silly logging for now
    try {
      fs.appendFile(
        "./db/db_query.log",

        "executed query: " +
          text +
          " at: " +
          new Date() +
          " for: " +
          duration.toString() +
          " ms\n",

        (err) => {
          if (err) {
            console.log("Error writing file: " + err.message + " " + err.stack);
          }
        }
      );
    } catch (err) {
      console.log("Error writing file: " + err.message + " " + err.stack);
    }

    //return pg pool.query result object
    return res;
  } catch (err) {
    console.log(
      "ERROR EXECUTING QUERY: " + text + "\n" + err.message + "\n" + err.stack
    );

    //silly logging for now
    try {
      fs.appendFile(
        "./db/db_query_fail.log",

        "Failed query: " +
          text +
          " at: " +
          new Date() +
          "\n" +
          err.message +
          "\n" +
          err.stack,

        (err) => {
          if (err) {
            console.log("Error writing file: " + err.message + " " + err.stack);
          }
        }
      );
    } catch (err) {
      console.log("Error writing file: " + err.message + " " + err.stack);
    }
    return false;
  }
};

module.exports = { query };
