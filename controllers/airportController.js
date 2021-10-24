const express = require("express");

const app = express();

app.use(express.json());

const sql = require("../Database/index");

exports.getAllAirports = async (req, res) => {
  try {
    const theAirports = await sql`SELECT * FROM Airport`;
    res.status(200).json({
      status: "success",
      theAirports,
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.addAirport = async (req, res) => {
  const { id } = req.params;

  const { Code } = req.body;
  try {
    const newAirport = await sql`
  INSERT INTO Airport (
    code, city_id
  ) VALUES (
    ${Code}, ${id}
  )
  returning *
`;

    res.json(newAirport);
  } catch (err) {
    console.error(err.message);
  }
};

exports.updateAirport = async (req, res) => {
  const { code } = req.body;
  const { id } = req.params;

  try {
    await db.query("UPDATE Airport SET code = $1 WHERE id = $2", [code, id]);
    const updatedAirport = `the Airport updated  succesfuly
      the Airport code : ${code}`;
    res.status(201).json(updatedAirport);
  } catch (err) {
    console.error(err.message);
  }
};
