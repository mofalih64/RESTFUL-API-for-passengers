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
  

  const { airport_code,city_code } = req.body;
  try {
    let city_id= await sql` SELECT id FROM City WHERE code=${city_code}`
    const newAirport = await sql`
  INSERT INTO Airport (
    code, city_id
  ) VALUES (
    ${airport_code}, ${city_id[0].id}
  )
  returning *
`;

    res.status(201).json(newAirport);
  } catch (err) {
    console.log(err.message);
  }
};

exports.updateAirport = async (req, res) => {
  const { code } = req.body;
  const { id } = req.params;

  try {
   let newairport= await sql`UPDATE Airport SET code = ${code} WHERE id = ${id} returning *`;
   
    res.status(201).json(newairport);
  } catch (err) {
    console.log(err.message);
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