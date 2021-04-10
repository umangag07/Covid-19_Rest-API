const mongoose = require("mongoose");
const I_Schema = mongoose.Schema({
  Day: {
    type: Number,
    required: true,
  },
  Data_date: {
    type: Date,
    required: true,
  },
  TotalConfirmed: {
    type: Number,
    required: true,
  },
  TotalDeaths: {
    type: Number,
    required: true,
  },
  TotalRecovered: {
    type: Number,
    required: true,
  },
  DailyConfirmed: {
    type: Number,
    required: true,
  },
  DailyDeaths: {
    type: Number,
    required: true,
  },
  DailyRecovered: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Total_India_Covidcase", I_Schema);
