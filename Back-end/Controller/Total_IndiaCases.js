const mongoose = require('mongoose')
const Total_India_Data = require('../Model/Total_CovidCases_India')

exports.retriveData = async (req, res) => {
    try {
        const Data = await Total_India_Data.find()
        res.send( Data )

    } catch (err) {
        res.send({ error: "Data could not be fetched" })
    }
}
exports.postData = (req, res) => {
    const new_data = new Total_India_Data({
        Data_date: req.body.Data_date,
        TotalConfirmed: req.body.TotalConfirmed,
        TotalDeaths: req.body.TotalDeaths,
        TotalRecovered: req.body.TotalRecovered,
        DailyConfirmed: req.body.DailyConfirmed,
        DailyDeaths: req.body.DailyDeaths,
        DailyRecovered: req.body.DailyRecovered,
        
    });
    new_data.save()
        .then(response => res.send({ message: response }))
        .catch(err => res.send({ error: err }))

}
exports.deleteData = (req,res)=>{
    var querry = {TotalConfirmed:/[0-9]/}
    Total_India_Data.deleteMany(querry)
    .then(response=>res.send({message:response}))
    .catch(err=>res.send({errormessage:err}))
  
}