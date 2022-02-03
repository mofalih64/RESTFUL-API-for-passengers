const express = require("express");

const app = express();

app.use(express.json());

const sql = require("../Database/index");
const pool= require("../Database/datacone")

exports.getAllCities = async (req, res) => {
  try {
    const theCities = await pool.query("SELECT * FROM City");
    res.status(200).json({
      status: "success",
      theCities,
    });
  }
  // try {
  //   const theCities = await sql`SELECT * FROM City`;
  //   res.status(200).json({
  //     status: "success",
  //     theCities,
  //   });
  // }
   catch (err) {
    console.log(err.message);
  }
};

exports.addCity = async (req, res) => {
  const { Code, cityName } = req.body;
  // console.log(Code, cityName);
  try {
    const newCity = await pool.query("INSERT into City (Code, city_name) values($1,$2) RETURNING *",[Code,cityName])
//     `
//   INSERT into City (
//     Code, city_name
//   ) values (
//     ${Code}, ${cityName}
//   )
//   returning *
// `;
//     // const newCity = await db.query(
//     //   "INSERT INTO City (Code,city_name) VALUES ($1, $2) RETURNING *",
//     //   Code,
//     //   cityName
//     // );

    res.json(newCity);
  } catch (err) {
    console.error(err.message);
  }
};

exports.updateCity = async (req, res) => {
  const { Code } = req.body;
  const { id } = req.params;

  try {
    const updateCity = await sql`
  UPDATE City SET Code = ${Code} WHERE id= ${id}

  
  returning *
`;

    // const updateCity = await db.query(
    //   "UPDATE City SET Code = $1 WHERE id = $2",
    //   [Code, id]
    // );

    res.json(updateCity);
  } catch (err) {
    console.error(err.message);
  }
};

exports.getCity_code = async (req, res) => {
  const { id } = req.params;

  try {
    const the_city = await sql`SELECT * FROM City WHERE id = ${id}`;

    res.json(the_city);
  } catch (err) {
    // console.error(err.message);
  }
};
