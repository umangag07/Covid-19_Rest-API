const mongoose = require('mongoose')
const Data_India = require('../Model/Data_India')

exports.retriveData = async (req, res) => {
    try {
        const Data = await Data_India.find()
        res.send( Data )

    } catch (err) {
        res.send({ error: "Data could not be fetched" })
    }
}
exports.postData = (req, res) => {
    const new_data = new Data_India({
        active: req.body.active,
        confirmed: req.body.confirmed,
        deaths: req.body.deaths,
        deltaconfirmed: req.body.deltaconfirmed,
        deltadeaths: req.body.deltadeaths,
        deltarecovered: req.body.deltarecovered,
        lastupdatedtime: req.body.lastupdatedtime,
        migratedother: req.body.migratedother,
        recovered: req.body.recovered,
        state: req.body.state,
        statecode: req.body.statecode,
    });
    new_data.save()
        .then(response => res.send({ message: response }))
        .catch(err => res.send({ error: err }))

}
exports.retriveSpecificData = async (req, res) => {
    try {
        const name = req.params;
        // console.log("params", name);
        var querry = { state: name.statename }
        // console.log("querry", querry);
        const Data = Data_India.find(querry)
            .then(response => {
                // console.log(response, response.length)
                if (response.length >= 1) {
                    // console.log(response)
                    res.send(response)
                }
                else {
                    res.send(
                        {
                            error_message: "Data not found",
                            message: "Specify the state properly"
                        })
                }
            })
            .catch(err => { console.log(err); res.send({ message: err }); })

    } catch (err) {
        res.send({ error: err })
    }
}
exports.deleteData = (req,res)=>{
    var querry = {active:/[0-9][0-9]/}
    Data_India.deleteMany(querry)
    .then(response=>res.send({message:response}))
    .catch(err=>res.send({errormessage:err}))
  
}
