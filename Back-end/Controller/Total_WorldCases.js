const mongoose = require("mongoose");
const Total_World_Data = require("../Model/Total_CovidCases_World");

exports.retriveData = async (req, res) => {
  try {
    const Data = await Total_World_Data.find();
    res.send(Data);
  } catch (err) {
    res.send({ error: "Data could not be fetched" });
  }
};
exports.postData = (req, res) => {
  const new_data = new Total_World_Data({
    Day: req.body.Day,
    Timestamp: req.body.Timestamp,
    TotalConfirmed: req.body.TotalConfirmed,
    TotalDeaths: req.body.TotalDeaths,
    DailyConfirmed: req.body.DailyConfirmed,
    DailyDeaths: req.body.DailyDeaths,
  });
  new_data
    .save()
    .then((response) => res.send({ message: response }))
    .catch((err) => res.send({ error: err }));
};
exports.deleteData = (req, res) => {
  Total_World_Data.collection.deleteMany({}, (err, delOk) => {
    if (err) {
      res.send(err);
    } else {
      res.send(delOk);
    }
  });
};
