const { default: axios } = require("axios");
var cron = require("node-cron");
const Total_IndiaCases_Model = require("./Model/Total_CovidCases_India");
const Total_WorldCases_Model = require("./Model/Total_CovidCases_World");
function schedule() {
  // everyday at 12.10 pm cronjob is scheduled for UPDATING TOTAL WORLD CASES
  cron.schedule("10 12 * * *", async () => {
    const response = await axios.get("https://covid19.who.int/page-data/index/page-data.json");
    var Data = response.data;
    var required_data = Data.result.pageContext.rawDataSets.byDay.rows;
    const data_length = required_data.length;
    var data_post = required_data;
    const Db_data = await Total_WorldCases_Model.find();
    const Db_data_length = Db_data.length;
    console.log(Db_data.length);
    console.log(required_data);
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
          let res = await axios.post(
            "http://localhost:3000/total_covid_cases_world/post_data",
            payload
          );
          console.log(res.data);

        } catch (error) {
          console.log({ "Erro in post": error })
        }
      }
    } else {
      console.log("original data not updated yet");
    }

  })

  // everyday at 12.10 pm cron job is schduled for UPDATING TOTAL INDIA CASES
  cron.schedule(" 10 12 * * *", async () => {
    // var d = new Date();
    // console.log(`Task was done at ${d.toTimeString()}`);

    try {
      const response = await axios.get(
        "https://api.covid19india.org/data.json"
      );
      const data = response.data;
      const Total_data = data.cases_time_series;
      const data_length = Total_data.length;
      const required_data = Total_data;
      const Db_data = await Total_IndiaCases_Model.find();
      const Db_data_length = Db_data.length;
      console.log(Db_data.length);
      console.log(required_data);
      if (data_length > Db_data_length) {
        for (let i = Db_data_length; i < data_length; i++) {
          let payload = {
            Day: i + 1,
            Data_date: required_data.dateymd,
            TotalConfirmed: required_data[i].totalconfirmed,
            TotalDeaths: required_data[i].totaldeceased,
            TotalRecovered: required_data[i].totalrecovered,
            DailyConfirmed: required_data[i].dailyconfirmed,
            DailyDeaths: required_data[i].dailydeceased,
            DailyRecovered: required_data[i].dailyrecovered,
          };
          try {
            let res = await axios.post(
              "http://localhost:3000/total_covid_cases_india/post_data",
              payload
            );
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
        }

      } else {
        console.log("original data not updated yet");
      }


    } catch (error) {
      console.log(error);
    }
  });
}

// everyday at 12.10 pm cronjob is scheduled for UPDATING INDIVIDUAL STATE DATA OF INDIA
cron.schedule(" 10 12 * * * ", async () => {
  try {
    axios.delete("http://localhost:3000/covid_data_india/delete_data");
    const Response = await axios.get("https://api.covid19india.org/data.json");
    var Data = Response.data;
    var required_data = Data.statewise;
    const Data_length = required_data.length;
    const Post_Data = required_data;
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
        statenotes: Post_Data[i].statenotes
      }
      try {
        let res = await axios.post(
          "http://localhost:3000/covid_data_india/post_data",
          payload
        );
        console.log(res.data);

      } catch (e) {
        console.log({ "Message": "Data could not be updated" })
      }
    }


  } catch (e) {
    console.log({ "Message": e });
  }

})

// everyday at 12.10pm cronjob is scheduled for UPDATING WORLD DATA OF INDIVIDUAL COUNTRY
cron.schedule(" 10 12 * * * ", async () => {
  try {
    const Response = await axios.get("https://corona.lmao.ninja/v2/countries?yesterday&sort");
    axios.delete("http://localhost:3000/covid_data_world/delete_data");
    var Data = Response.data;
    var required_data = Data;
    const Data_length = required_data.length;
    const Post_Data = required_data;
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
      }
      try {
        let res = await axios.post(
          "http://localhost:3000/covid_data_world/post_data",
          payload
        );
        console.log(res.data);

      } catch (e) {
        console.log({ "Message": "Data could not be updated" })
      }
    }



  } catch (e) {
    console.log({ "Message": e });
  }

})

module.exports = schedule();
