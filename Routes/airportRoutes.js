const express = require('express');

const airportRouter = express.Router();
const authController= require("../controllers/authController")
const airportController= require("../controllers/airportController")



airportRouter
  .route('/')
  .get(airportController.getAllAirports)
  .patch(
    authController.authorize,
    airportController.updateAirport
  )
  .post(
    airportController.addAirport
  );

  airportRouter.route("/:id")
  .patch( airportController.updateAirport)
  .delete(authController.authorize,airportController.removeAirport);

  module.exports=airportRouter
