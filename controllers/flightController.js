const express = require("express");

const app = express();

app.use(express.json());

const pool= require("../Database/datacone")


exports.addFlight = async (req, res) => {
    // console.log(req.body)
    const { from_airport_code,to_airport_code,duration } = req.body;

    try {
// console.log(from_airport_code,to_airport_code,duration)
        let from_Airport_id=await pool.query("SELECT id FROM Airport WHERE code=$1 " ,[from_airport_code])
        from_Airport_id=from_Airport_id.rows[0].id
        // console.log(` ________________ ${from_Airport_id} and $$$$$$$$ ${from_Airport_id}`)
        let to_Airport_id=await pool.query("SELECT id FROM Airport WHERE code=$1" ,[to_airport_code])
        to_Airport_id=to_Airport_id.rows[0].id
        // console.log(` ________________ ${to_Airport_id.rows[0].id} and !!! ${to_Airport_id.rows}`)

        let newFlight = await pool.query("INSERT INTO Flight (origin, destination,duration) values($1,$2,$3) RETURNING*",
        [from_Airport_id,to_Airport_id,duration],(result,err)=>{
            console.log(`${result} Q!!!!!!!!!!!!!!!!!!!`)
            console.log(err)
        })
console.log(`${newFlight}__________________`)
        res.json(newFlight);



    } catch (error) {
        console.error(error.message);
      }
}

exports.getAllFlights=async(req,res)=>{
    try {
        
        let the_flights=await (await pool.query("SELECT *  FROM Flight")).rows
        res.status(200).json({
            data:the_flights
        })
    } catch (error) {
        console.log(error)
    }
}


exports.addPassToFlight=async(req,res)=>{
    const { id } = req.params;
    // const { from_airport_code,to_airport_code,duration } = req.body;
    // console.log(req.user)
    try {
        
    
    // if(req.user){
    // the_user= await pool.query("SELECT * FROM users WHERE id=$1",[req.user])
    //     // console.log(`result____ ${result}`)
    //     // console.log(err)
    
    // }
    // the_user=the_user.rows[0]

    flightData= await (await pool.query("SELECT * FROM Flight WHERE id=$1",[id])).rows
    // console.log(flightData)
    if(flightData.length==0){
        throw new Error('there is no flight with this id');
    }
    // console.log(`the id of user ${the_user.id}`)
    filght_to_user= await pool.query("INSERT INTO Flight_for_User(user_id,flight_id) values($1,$2) ",[req.user,id,])
    res.status(200).json({
        message:"the user added succesfuly"});
    } catch (error) {
        res.status(403).json({
            message:error.message
        })
    //    console.log(error.message) 
    } 



}

exports.flightPassengers=async(req,res)=>{
    const { id } = req.params;
    try {
        // users= await pool.query("SELECT * FROM  Flight_for_User A where Flight_for_User(flight_id)=$1 left JOIN USERS B ON A.user_id = B.id",[id])

        users= await pool.query("SELECT firstname ,lastname ,email ,username ,passport ,passport_image ,user_id , flight_id FROM  users B left JOIN Flight_for_User A ON A.user_id = B.id  where flight_id=$1",[id])
        


        res.status(200).json({
            data:users.rows
        })
    } catch (err) {
        console.log(err.message)
    }

}