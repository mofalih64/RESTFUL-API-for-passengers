const express = require("express");

const app = express();

app.use(express.json());

const sql = require("../Database/index");
const pool= require("../Database/datacone")


exports.getAllAirports = async (req, res) => {
  try {
    const theAirports = await sql`SELECT * FROM Airport`;
    console.log(req.headers)
    res.status(200).json({
      status: "success",
      theAirports,
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.addAirport = async (req, res) => {
  

  const { airport_code,city_code } = req.body;
  // console.log(`${airport_code} air port code`)
  // console.log(`${city_code} city code`)


  try {
    let city_id= await pool.query(" SELECT id FROM City WHERE code=$1",[city_code])
    console.log(city_id.rows[0].id)
    const newAirport = await sql`
  INSERT INTO Airport (
    code, city_id
  ) VALUES (
    ${airport_code}, ${city_id.rows[0].id}
  )
  returning *
`;

    res.status(201).json(newAirport);
  } catch (err) {
    console.log(err);
  }
};

exports.updateAirport = async (req, res) => {
  const { code } = req.body;
  const { id } = req.params;

  try {
   let newairport= await sql`UPDATE Airport SET code = ${code} WHERE id = ${id} returning *`;
   
    res.status(201).json(newairport);
  } catch (err) {
    // console.log(err.message);
  }
};

exports.removeAirport=async(req,res)=>{
  const { id } = req.params;
  try{
  await sql`DELETE FROM Airport WHERE id=${id}`
  res.status(202).json({
    "status":"succees"
  })
} catch(err){
  console.log(err.message)
}
}