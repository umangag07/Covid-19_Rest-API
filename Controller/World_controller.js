const mongoose = require("mongoose");
const Data_World = require("../Model/Data_World");

exports.retriveData = async (req, res) => {
  try {
    const Data = await Data_World.find();
    res.send(Data);
  } catch (err) {
    res.send({ error: "Data could not be fetched" });
  }
};
exports.retriveRequiredData = async (req, res) => {
  try {
    const Data = await Data_World.find();
    const requiredData = Data.map(f=>{
      var unitData = {};
      unitData.country = f.country;
      unitData.cases = f.cases;
      unitData.todayCases = f.todayCases;
      unitData.activePerOneMillion = f.activePerOneMillion;
      unitData.recoveredPerOneMillion = f.recoveredPerOneMillion;
      unitData.criticalPerOneMillion = f.criticalPerOneMillion;
      unitData.tests = f.tests
      unitData.population = f.population;
      unitData.deaths = f.deaths;
      unitData.todayDeaths = f.todayDeaths;


      return unitData;
    });
    console.log(requiredData);
    res.send(requiredData);
  } catch (err) {
    res.send({ error: "Data could not be fetched" });
  }
};
exports.retriveSpecificData = async (req, res) => {
  try {
    const name = req.params;
    // console.log("params", name);
    var querry = { country: name.countryname };
    // console.log("querry", querry);
    const Data = Data_World.find(querry)
      .then((response) => {
        // console.log(response, response.length)
        if (response.length >= 1) {
          // console.log(response)
          res.send(response);
        } else {
          res.send({
            error_message: "Data not found",
            message: "Specify the state properly",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: err });
      });
  } catch (err) {
    res.send({ error: err });
  }
};
exports.postData = (req, res) => {
  const new_data = new Data_World({
    updated: req.body.updated,
    country: req.body.country,
    countryInfo: {
      _id: req.body.countryInfo._id,
      iso2: req.body.countryInfo.iso2,
      iso3: req.body.countryInfo.iso3,
      lat: req.body.countryInfo.lat,
      long: req.body.countryInfo.long,
      flag: req.body.countryInfo.flag,
    },
    cases: req.body.cases,
    todayCases: req.body.todayCases,
    deaths: req.body.deaths,
    todayDeaths: req.body.todayDeaths,
    recovered: req.body.recovered,
    todayRecovered: req.body.todayRecovered,
    active: req.body.active,
    critical: req.body.critical,
    casesPerOneMillion: req.body.casesPerOneMillion,
    deathsPerOneMillion: req.body.deathsPerOneMillion,
    tests: req.body.tests,
    testsPerOneMillion: req.body.testsPerOneMillion,
    population: req.body.population,
    continent: req.body.continent,
    oneCasePerPeople: req.body.oneCasePerPeople,
    oneDeathPerPeople: req.body.oneDeathPerPeople,
    oneTestPerPeople: req.body.oneTestPerPeople,
    activePerOneMillion: req.body.activePerOneMillion,
    recoveredPerOneMillion: req.body.recoveredPerOneMillion,
    criticalPerOneMillion: req.body.criticalPerOneMillion,
  });
  new_data
    .save()
    .then((response) => res.send({ message: response }))
    .catch((err) => res.send({ error: err }));
};
exports.deleteData = (req, res) => {
  var querry = { country: /[abc]/i };
  Data_World.deleteMany(querry)
    .then((response) => res.send({ message: response }))
    .catch((err) => res.send({ errormessage: err }));
};
