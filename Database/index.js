const pool = require("postgres");

const db = pool({
  user: "mofalih",
  host: "localhost",
  database: "passengersapi",
  password: "QWERY$$",
  port: 5432,
});
module.exports = db;

// exports.addFlight = async (req, res, next) => {
//   try {
//     const flight = await db.query("INSERT INTO Flight (");
//   } catch (err) {}
// };
