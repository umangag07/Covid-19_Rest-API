const { default: axios } = require("axios");
var cron = require("node-cron");
const Total_IndiaCases_Model = require("./Model/Total_CovidCases_India");
const Total_WorldCases_Model = require("./Model/Total_CovidCases_World");
function schedule() {
  // everyday at 6.40am cronjob is scheduled for updating Total world covid cases
  cron.schedule("40 18 * * *", async () => {
    const response = await axios.get("https://covid19.who.int/page-data/index/page-data.json");
    var Data = response.data;
    var required_data = Data.result.pageContext.rawDataSets.byDay.rows;
    const data_length = required_data.length;
    var data_post = required_data[data_length - 1];
    const Db_data = await Total_WorldCases_Model.find();
    const Db_data_length = Db_data.length;
    console.log(Db_data.length);
    console.log(required_data);
    if (data_length > Db_data_length) {
      let payload = {
        Day: data_length,
        Timestamp: data_post[0],
        TotalConfirmed: data_post[7],
        TotalDeaths: data_post[2],
        DailyConfirmed: data_post[6],
        DailyDeaths: data_post[1],
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
    } else {
      console.log("original data not updated yet");
    }

  })
  
  // cron job everyday at 12.08am  to update Total India cases
  cron.schedule(" 08 12 * * *", async () => {
    // var d = new Date();
    // console.log(`Task was done at ${d.toTimeString()}`);

    try {
      const response = await axios.get(
        "https://api.covid19india.org/data.json"
      );
      const data = response.data;
      const Total_data = data.cases_time_series;
      const data_length = Total_data.length;
      const required_data = Total_data[data_length - 1];
      const Db_data = await Total_IndiaCases_Model.find();
      const Db_data_length = Db_data.length;
      console.log(Db_data.length);
      console.log(required_data);
      if (data_length > Db_data_length) {
        let payload = {
          Day: data_length,
          Data_date: required_data.dateymd,
          TotalConfirmed: required_data.totalconfirmed,
          TotalDeaths: required_data.totaldeceased,
          TotalRecovered: required_data.totalrecovered,
          DailyConfirmed: required_data.dailyconfirmed,
          DailyDeaths: required_data.dailydeceased,
          DailyRecovered: required_data.dailyrecovered,
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
      } else {
        console.log("original data not updated yet");
      }


    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = schedule();
