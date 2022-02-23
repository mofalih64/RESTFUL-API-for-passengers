const express = require('express');

const flightRouter = express.Router();
const authController= require("../controllers/authController")
const flightController= require("../controllers/flightController")




flightRouter
  .route('/')
  .get(authController.authorize,flightController.getAllFlights)
  .post(authController.authorize,
    flightController.addFlight
  );

  module.exports=flightRouter
