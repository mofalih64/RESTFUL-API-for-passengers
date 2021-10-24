const db = require("./Database/index");
exports.getAllFlights = async (req, res, next) => {
  try {
    const theFlights = await db.query("select * from Flights");
    res.status(200).json({
      status: "success",
      data: theFlights,
    });
  } catch (err) {
    res.json(err);
  }
  next();
};
