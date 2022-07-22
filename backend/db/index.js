require('dotenv').config()

const {Pool} = require('pg');



const pool = new Pool (
    {
        user: process.env.user,
        host: process.env.host,
        database: process.env.database,
        password: process.env.password,
        port: process.env.database_port
    }
);

module.exports = {
    query: (text, params) => pool.query(text, params),
};
