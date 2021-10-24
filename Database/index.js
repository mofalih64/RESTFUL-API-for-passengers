const pool = require("postgres");

const db = pool({
  user: "postgres",
  host: "localhost",
  database: "passengers_api",
  password: "Entg12345",
  port: 5432,
});
module.exports = db;

// exports.addFlight = async (req, res, next) => {
//   try {
//     const flight = await db.query("INSERT INTO Flight (");
//   } catch (err) {}
// };
