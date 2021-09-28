require("dotenv").config();
const express = require("express");
const Controlers = require("./Database/index");
const db = require("./Database/index");

const app = express();

app.use(express.json());
app.get("/getCities", Controlers.getAllCities);

// app.post("createFlight", Controlers.addFlight);
// app.delete("deleteFlight", Controlers.removeFlight);
// app.patch("updateFlight", Controlers.updateFlight);

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
