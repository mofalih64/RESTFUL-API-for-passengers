require("dotenv").config();
const express = require("express");
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cityRouter = require('./Routes/CityRoutes');
const userRouter = require('./routes/userRoutes');
const flightRouter = require('./Routes/flightRoutes');
const airportRoter = require('./routes/airportRoutes');


app.use('/City', cityRouter);
app.use('/user', userRouter);
app.use('/Airport', airportRoter);
app.use('/Flight',flightRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`the server is on port :${port}`);
});

// process.on("unhandledRejection", (err) => {
//   server.close(() => {
//     console.log(err.name, err.message);
//     process.exit(1);
//   });
// });
