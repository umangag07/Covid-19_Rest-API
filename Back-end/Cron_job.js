const { default: axios } = require("axios");
var cron = require("node-cron");
var count = 0;
function schedule() {
  // everyday at 7am cronjob is scheduled
  cron.schedule(" 0 7 * * *", async () => {
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
      console.log(required_data);
      let payload = {
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
      }catch (error) {
        console.log(error);
      }
    }catch (error) {
      console.log(error);
    }
  });
}

module.exports = schedule();
