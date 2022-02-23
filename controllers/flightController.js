const express = require("express");

const app = express();

app.use(express.json());

// const sql = require("../Database/index");
const pool= require("../Database/datacone")


exports.addFlight = async (req, res) => {
    try {
        const { from_airport_code,to_airport_code,duration } = req.body;
console.log(from_airport_code,to_airport_code,duration)
        let from_Airport_id=await pool.query("SELECT id FROM Airport WHERE code=$1 " ,[from_airport_code])
        console.log(` ________________ ${from_Airport_id.rows[0].id} and $$$$$$$$ ${from_Airport_id}`)
        let to_Airport_id=await pool.query("SELECT id FROM Airport WHERE code=$1" ,[to_airport_code])
        console.log(` ________________ ${to_Airport_id.rows[0].id} and !!! ${to_Airport_id.rows}`)

        let newFlight = await pool.query("INSERT INTO Flight (origin, destination,duration) values($1,$2,$3) RETURNING *",
        [from_Airport_id,to_Airport_id,duration],(err)=>{
            console.log(err)
        })

        res.json(newFlight);



    } catch (error) {
        console.error(error.message);
      }
}

exports.getAllFlights=async(req,res)=>{
    try {
        
        let the_flights=await pool.query("SELECT *  FROM FIight")
        res.status(200).json({
            data:the_flights
        })
    } catch (error) {
        console.log(error)
    }
}
