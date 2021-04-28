const mongoose = require("mongoose");
const IndiaSchema = require("../Model/PredictedDataIndia");
const WorldSchema = require("../Model/PredictedDataWorld");

exports.retriveIndiaData = async (req,res)=>{
    try {
        const Data = await IndiaSchema.find();
        res.send(Data);
      } catch (err) {
        res.send({ error: "Data could not be fetched" });
      }
}
exports.retriveWorldData = async (req,res)=>{
    try {
        const Data = await WorldSchema.find();
        res.send(Data);
      } catch (err) {
        res.send({ error: "Data could not be fetched" });
      }
}