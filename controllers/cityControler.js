const express = require("express");

const app = express();

app.use(express.json());

// const sql = require("../Database/index");
const pool= require("../Database/datacone")

exports.getAllCities = async (req, res) => {
  try {
    const theCities = await (await pool.query("SELECT * FROM City")).rows;
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
    if(newCity.length==0){
      throw new Error('there is a problem with the body , remeber the code and name must be unique');
  }
    res.json(newCity);
  } catch (err) {
    res.json({meesage:err.detail})
    // console.error(err.message);
  }
};

exports.updateCity = async (req, res) => {
  const { Code } = req.body;
  const { id } = req.params;

  try {
    const updateCity = await  pool.query(" UPDATE City SET Code = $1} WHERE id= $2 RETURNING *",[Code,id]);

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
    const the_city = await pool.query( "SELECT * FROM City WHERE id =$1",[id]);

    res.json(the_city);
  } catch (err) {
    // console.error(err.message);
  }
};
