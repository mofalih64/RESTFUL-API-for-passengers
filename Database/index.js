const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "local",
  database: "passengers_api",
  password: "Entg12345",
  port: 5432,
});
exports.getAllCities = async (req, res, next) => {
  try {
    const theCities = await pool.query("SELECT * FROM City");
    res.status(200).json({
      status: "success",
      data: theCities,
    });
  } catch (err) {
    res.status(404).json(err);
  }
  next();
};

// exports.addFlight = async (req, res, next) => {
//   try {
//     const flight = await db.query("INSERT INTO Flight (");
//   } catch (err) {}
// };
