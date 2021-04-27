const mongoose = require("mongoose");

const World_Schema = mongoose.Schema({
  updated: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
    required: true,
  },
  countryInfo: {
    _id: { type: Number },
    iso2: { type: String },
    iso3: { type: String },
    lat: { type: Number },
    long: { type: Number },
    flag: { type: String },
  },
  recovered:{
   type: Number
  },
  todayRecovered: {
    type: Number,
  },
  cases: {
    type: Number,
  },
  todayCases: {
    type: Number,
  },
  deaths: {
    type: Number,
  },
  todayDeaths: {
    type: Number,
  },
  critical: {
    type: Number,
  },
  casesPerOneMillion: {
    type: Number,
  },
  deathsPerOneMillion: {
    type: Number,
  },
  tests: {
    type: Number,
  },
  testsPerOneMillion: {
    type: Number,
  },
  population: {
    type: Number,
  },
  continent: {
    type: String,
    default: "",
  },
  oneCasePerPeople: {
    type: Number,
  },
  oneDeathPerPeople: {
    type: Number,
  },
  oneTestPerPeople: {
    type: Number,
  },
  activePerOneMillion: {
    type: Number,
  },
  recoveredPerOneMillion: {
    type: Number,
  },
  criticalPerOneMillion: {
    type: Number,
  },
});

module.exports = mongoose.model("Covid_Data_World_", World_Schema);
