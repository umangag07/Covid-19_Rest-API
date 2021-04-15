const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const job_scheduler = require("./Job_scheduler");
const cron_job = require("./Cron_job");

require("dotenv/config");
// middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes
const getData_World = require("./Routes/Data_World_Route");
app.use("/covid_data_world", getData_World);
const getData_India = require("./Routes/Data_India_Route");
app.use("/covid_data_india", getData_India);
const getTotalData_India = require("./Routes/Total_Data_India");
app.use("/total_covid_cases_india", getTotalData_India);
const getTotalData_World = require("./Routes/Total_Data_World");
app.use("/total_covid_cases_world", getTotalData_World);

//Base URl
app.get("/", (req, res) => {
  res.send({
    message: "Base URL is correct move forward by adding the below endpoints",
    Endpoints: {
      "/total_covid_cases_world/get_data":
        "Request type(GET) will give you all the data in json format.",
      "/total_covid_cases_india/get_data":
        "Request type(GET) will give you all the data in json format.",
      "/covid_data_world/get_data":
        "Request type(GET) will give you the data in json format.",
      "/covid_data_world/get_data/Countryname":
        "Request type(GET), type the country name is capitalize format  will give you the data of specific country in json format.",
      "/covid_data_india/get_data":
        "Request type(GET) will give you the data in json format.",
      "/covid_data_india/get_data/Statename":
        "Request type(GET), type the state name is capitalize format  will give you the data of specific state in json format.",
    },
  });
});

app.get("*", (req, res) => {
  res.status(404).send({ Error: "It is not the correct URI endpoint" });
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to database");
  }
);

module.exports = app;
