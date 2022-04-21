const express = require('express');

const flightRouter = express.Router();
const authController= require("../controllers/authController")
const flightController= require("../controllers/flightController")




flightRouter
  .route('/')
  .get(flightController.getAllFlights)
  .post(
    flightController.addFlight
  );

  flightRouter.route('/:id')
  .patch(authController.authorize,
    flightController.addPassToFlight)
    .get(authController.authorize,flightController.flightPassengers)


  module.exports=flightRouter
