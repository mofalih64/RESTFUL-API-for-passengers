const express = require("express");
const bcrypt = require('bcrypt');
const jwtGenerstor=require("../Utils/jwtGenerator")

const app = express();

app.use(express.json());

const sql = require("../Database/datacone");

exports.addUser=async(req,res)=>{
    try{

    
const {firstname,password,email}=req.body;

const  checkData=await sql.query("SELECT * FROM Users WHERE email=$1 ", [email]);

if(checkData.rows.length!==0) {
   return  res.status(401).send("the email already used");
}

const saltRound=10;
const salt=await bcrypt.genSalt(saltRound);

const bycyprPassword=await bcrypt.hash(password,salt);

let newUser=await sql.query("INSERT INTO Users (firstname,password,email) VALUES ($1,$2,$3) returning *",[firstname,bycyprPassword,email])

const token=jwtGenerstor(newUser.rows[0].id)

res.status(200).json({
    status:'success',
    token,
data:newUser.rows})


    }
    catch(error){
        console.error(error.message)
    }
}


exports.login=async (req,res)=>{
    try {

        const {email,password}=req.body

        let user=await sql.query("SELECT * FROM Users WHERE email=$1", [email]);

        if(user.rows[0].length===0){
            res.status(401).send("the email or password is not correct")
        }

        const validPassword=await bcrypt.compare(password,user.rows[0].password)

        if(!validPassword){
            res.status(401).send("the email or password is not correct")
        }

        const token = jwtGenerstor(user.rows[0].id)
        
        res.status(200).json({
            status:'success',
            token,
        data:user})

    } catch (error) {
        console.error(error.message)

        
    }
}
