require("dotenv").config();
const express = require("express");
const cityControler = require("./controllers/cityControler");
const AirportControler = require("./controllers/airportController");
const userController= require("./controllers/userController")
const authController= require("./controllers/authController")
const app = express();

app.use(express.json());
app.get("/Cities", cityControler.getAllCities);
app.post("/Cities", cityControler.addCity);
app.patch("/cities/:id",  cityControler.updateCity);
app.get("/cities/:id", cityControler.getCity_code);
// app.delete("/cities/:cityName", cityControler.getCity_code);

app.get("/Airports",authController.authorize, AirportControler.getAllAirports);

// How to insert the airport data the require city id
app.post("/Airports", AirportControler.addAirport);
app.patch("/Airports/:id", AirportControler.updateAirport);
// app.get("/Airports/:id", cityControler.getCity_code);
app.delete("/Airports/:id", AirportControler.removeAirport);

app.post("/signup",userController.addUser);
app.post("/login",userController.login);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`the server is on port :${port}` );
});

// process.on("unhandledRejection", (err) => {
//   server.close(() => {
//     console.log(err.name, err.message);
//     process.exit(1);
//   });
// });
