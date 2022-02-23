const express = require('express');

const userRouter = express.Router();
const authController= require("../controllers/authController")
const userController= require("../controllers/userController")



userRouter
  .route('/signUp')
  .post(authController.validInfo,userController.addUser)
 
  userRouter
  .route('/logIn')
  .post(authController.validInfo,userController.login)

module.exports=userRouter
