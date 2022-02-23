const express = require('express');

const cityRouter = express.Router();
const authController= require("../controllers/authController")
const cityControler= require("../controllers/cityControler")



cityRouter
  .route('/')
  .get(cityControler.getAllCities)
  .patch(
    authController.authorize,
    cityControler.updateCity
  )
  .post(authController.authorize,
    cityControler.addCity
  );

  cityRouter.get("/:id", cityControler.getCity_code);

module.exports=cityRouter
