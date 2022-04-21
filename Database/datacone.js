require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  port: `${process.env.DATABASE_PORT}`,
  database: `${process.env.DATABASE_Name}`
});

module.exports = pool;