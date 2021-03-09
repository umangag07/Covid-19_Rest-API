const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes
const getData_World = require("./Routes/Data_World_Route");
app.use("/getData_World", getData_World);
const getData_India = require("./Routes/Data_India_Route");
app.use("/getData_India", getData_India);

app.use((req, res, next) => {
  res.send({ message: "working" });
  console.log("server is working");
  next();
});

module.exports = app;
