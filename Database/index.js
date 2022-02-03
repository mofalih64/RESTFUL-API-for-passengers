const pool = require("postgres");

const db = pool({
  user: "postgres",
  host: "localhost",
  database: "passengersapi",
  password: "1234",
  port: 5432,
});
module.exports = db;
