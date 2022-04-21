const { promisify } = require('util');
const jwt= require("jsonwebtoken")
require("dotenv").config()


exports.authorize=async (req,res,next)=>{
try {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token)
      if(!token){
res.status(401).send("not authorised please sign in")
      }

    const payload=await promisify (jwt.verify)(token,process.env.JWT_SECRET);
    // console.log(payload)
    req.user=payload.user;
    next();

} catch (error) {
    console.error(error.message)
     res.status(403).json("not authourised")
}

}

exports.validInfo=(req,res,next)=>{
        const { email, firstname, password } = req.body;
      
        function validEmail(userEmail) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
        }
      
        if (req.path === "/signup") {
          console.log(!email.length);
          if (![email, firstname, password].every(Boolean)) {
            return res.json("Missing Credentials");
          } else if (!validEmail(email)) {
            return res.json("Invalid Email");
          }
        } else if (req.path === "/login") {
          if (![email, password].every(Boolean)) {
            return res.json("Missing Credentials");
          } else if (!validEmail(email)) {
            return res.json("Invalid Email");
          }
        }
      
        next();
      };

      exports.checkToken=(req,res,next)=>{
        let token=req.headers['x-access-token']||req.headers['authorization'];

        if(token.startWith('Bearer')){
         token= token.splice(7,token.length);

        }
        next();
      }