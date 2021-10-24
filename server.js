require("dotenv").config();
const express = require("express");
const cityControler = require("./controllers/cityControler");
const AirportControler = require("./controllers/airportController");

// const db = require("./Database/index");

const app = express();

app.use(express.json());
app.get("/Cities", cityControler.getAllCities);
app.post("/addCity", cityControler.addCity);
app.patch("/cities/:id", cityControler.updateCity);
app.get("/cities/:id", cityControler.getCity_code);
// app.delete("/cities/:cityName", cityControler.getCity_code);

app.get("/Airports", AirportControler.getAllAirports);
app.post("/Airports", AirportControler.addAirport);
// app.patch("/Airports/:id", cityControler.updateAirport);
// app.get("/Airports/:id", cityControler.getCity_code);
// app.delete("/Airports/:id", cityControler.getCity_code);

// app.post("createFlight", Controlers.addFlight);
// app.delete("deleteFlight", Controlers.removeFlight);
// app.patch("updateFlight", Controlers.updateFlight);s

//async (req, res) => {
//   try {
//     const theFlights = await db.query("select * from flights");
//     res.status(200).json({
//       status: "success",
//       data: theFlights,
//     });
//   } catch (err) {
//     res.status(404).json(err);
//   }

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("the server is on ");
});

// process.on("unhandledRejection", (err) => {
//   server.close(() => {
//     console.log(err.name, err.message);
//     process.exit(1);
//   });
// });
