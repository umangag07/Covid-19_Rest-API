const { default: axios } = require("axios");
var cron = require("node-cron");
const Total_IndiaCases_Model = require("./Model/Total_CovidCases_India");
const Total_WorldCases_Model = require("./Model/Total_CovidCases_World");
require("dotenv/config");

function schedule() {
  // cronjob is scheduled for: UPDATING TOTAL WORLD CASES EVERY 6HR
  cron.schedule("0 */6 * * *", async () => {
    const response = await axios.get(process.env.API_TOTAL_WORLD);
    var Data = response.data;
    var required_data = Data.result.pageContext.rawDataSets.byDay.rows;
    const data_length = required_data.length;
    var data_post = required_data;
    const Db_data = await Total_WorldCases_Model.find();
    const Db_data_length = Db_data.length;
    if (data_length > Db_data_length) {
      for (let i = Db_data_length; i < data_length; i++) {
        let payload = {
          Day: i + 1,
          Timestamp: data_post[i][0],
          TotalConfirmed: data_post[i][7],
          TotalDeaths: data_post[i][2],
          DailyConfirmed: data_post[i][6],
          DailyDeaths: data_post[i][1],
        };
        try {
          let res = await axios.post(process.env.POST_TOTAL_WORLD, payload);
          console.log(res.data);
        } catch (error) {
          console.log({ "Erro in post": error });
        }
      }
      console.log("Total world cases updated");
    } else {
      console.log("original data not updated yet");
    }
  });

  // cron job is schduled for: UPDATING TOTAL INDIA CASES : 6HR
  cron.schedule("0 */6 * * *", async () => {
    try {
      const response = await axios.get(process.env.API_TOTAL_INDIA);
      const data = response.data;
      const Total_data = data.cases_time_series;
      const data_length = Total_data.length;
      const required_data = Total_data;
      const Db_data = await Total_IndiaCases_Model.find();
      const Db_data_length = Db_data.length;
      if (data_length > Db_data_length) {
        for (let i = Db_data_length; i < data_length; i++) {
          let payload = {
            Day: i + 1,
            Data_date: required_data[i].dateymd,
            TotalConfirmed: required_data[i].totalconfirmed,
            TotalDeaths: required_data[i].totaldeceased,
            TotalRecovered: required_data[i].totalrecovered,
            DailyConfirmed: required_data[i].dailyconfirmed,
            DailyDeaths: required_data[i].dailydeceased,
            DailyRecovered: required_data[i].dailyrecovered,
          };
          try {
            let res = await axios.post(process.env.POST_TOTAL_INDIA, payload);
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
        }
        console.log("Total India cases updated");
      } else {
        console.log("original data not updated yet");
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// cronjob is scheduled for: UPDATING INDIVIDUAL STATE DATA OF INDIA 2HR
cron.schedule("0 */2 * * * ", async () => {
  try {
    axios
      .delete(process.env.DELETE_STATE_DATA)
      .then((response) => console.log("State data", response.data));
    const Response = await axios.get(process.env.API_TOTAL_INDIA);
    var Data = Response.data;
    var Post_Data = Data.statewise;
    const Data_length = Post_Data.length;
    for (let i = 0; i < Data_length; i++) {
      const payload = {
        active: Post_Data[i].active,
        confirmed: Post_Data[i].confirmed,
        deaths: Post_Data[i].deaths,
        deltaconfirmed: Post_Data[i].deltaconfirmed,
        deltadeaths: Post_Data[i].deltadeaths,
        deltarecovered: Post_Data[i].deltarecovered,
        lastupdatedtime: Post_Data[i].lastupdatedtime,
        migratedother: Post_Data[i].migratedother,
        recovered: Post_Data[i].recovered,
        state: Post_Data[i].state,
        statecode: Post_Data[i].statecode,
        statenotes: Post_Data[i].statenotes,
      };
      try {
        let res = await axios.post(process.env.POST_INDIA_STATE, payload);
        console.log(res.data);
      } catch (e) {
        console.log({ Message: "Data could not be updated" });
      }
    }
    console.log("State data of india updated");
  } catch (e) {
    console.log({ Message: e });
  }
});

// cronjob is scheduled for: UPDATING WORLD DATA OF INDIVIDUAL COUNTRY 2HR
cron.schedule("0 */2 * * * ", async () => {
  try {
    axios
      .delete(process.env.DELETE_COUNTRY_DATA)
      .then((response) => console.log(response));
    const Response = await axios.get(process.env.API_COUNTRY_DATA);
    var Post_Data = Response.data;
    const Data_length = Post_Data.length;
    for (let i = 0; i < Data_length; i++) {
      const payload = {
        updated: Post_Data[i].updated,
        country: Post_Data[i].country,
        countryInfo: {
          _id: Post_Data[i].countryInfo._id,
          iso2: Post_Data[i].countryInfo.iso2,
          iso3: Post_Data[i].countryInfo.iso3,
          lat: Post_Data[i].countryInfo.lat,
          long: Post_Data[i].countryInfo.long,
          flag: Post_Data[i].countryInfo.flag,
        },
        cases: Post_Data[i].cases,
        todayCases: Post_Data[i].todayCases,
        deaths: Post_Data[i].deaths,
        todayDeaths: Post_Data[i].todayDeaths,
        recovered: Post_Data[i].recovered,
        todayRecovered: Post_Data[i].todayRecovered,
        active: Post_Data[i].active,
        critical: Post_Data[i].critical,
        casesPerOneMillion: Post_Data[i].casesPerOneMillion,
        deathsPerOneMillion: Post_Data[i].deathsPerOneMillion,
        tests: Post_Data[i].tests,
        testsPerOneMillion: Post_Data[i].testsPerOneMillion,
        population: Post_Data[i].population,
        continent: Post_Data[i].continent,
        oneCasePerPeople: Post_Data[i].oneCasePerPeople,
        oneDeathPerPeople: Post_Data[i].oneDeathPerPeople,
        oneTestPerPeople: Post_Data[i].oneTestPerPeople,
        activePerOneMillion: Post_Data[i].activePerOneMillion,
        recoveredPerOneMillion: Post_Data.recoveredPerOneMillion,
        criticalPerOneMillion: Post_Data.criticalPerOneMillion,
      };
      try {
        let res = await axios.post(process.env.POST_COUNTRY, payload);
        console.log(res.data);
      } catch (e) {
        console.log({ Message: "Data could not be updated" });
      }
    }
    console.log("Individual Country data updated");
  } catch (e) {
    console.log({ Message: e });
  }
});

module.exports = schedule();
