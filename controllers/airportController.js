const express = require("express");

const app = express();

app.use(express.json());

// const sql = require("../Database/index");
const pool= require("../Database/datacone")


exports.getAllAirports = async (req, res) => {
  try {
    const theAirports =  await (await pool.query("SELECT * FROM City")).rows;
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
    city_id=city_id.rows.id;
        console.log(city_id)

    const newAirport = await (await pool.query("INSERT INTO Airport (code, city_id ) VALUES ( $1, $2 ) returning *",[airport_code,city_id])).rows;

    res.status(201).json(newAirport);
  } catch (err) {
    res.json(err.message);

    console.log(err.message);
  }
};

exports.updateAirport = async (req, res) => {
  const { code } = req.body;
  const { id } = req.params;

  try {
    await  pool.query(" UPDATE City SET Code = $1} WHERE id= $2 RETURNING *",[Code,id]);
   let newairport= pool.query("UPDATE Airport SET code = $1 WHERE id = $2 returning *",[code,id]);
   
    res.status(201).json(newairport);
  } catch (err) {
    // console.log(err.message);
  }
};

exports.removeAirport=async(req,res)=>{
  const { id } = req.params;
  try{
  await pool.query("DELETE FROM Airport WHERE id=$1",[id])
  res.status(202).json({
    "status":"succees"
  })
} catch(err){
  console.log(err.message)
}
}