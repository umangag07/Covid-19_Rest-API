const mongoose = require('mongoose')
const Data_India = require('../Model/Data_India')

exports.retriveData = async (req, res) => {
    try {
        const Data = await Data_India.find()
        res.send({ data: Data })

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
        statenotes: req.body.statenotes
    });
    new_data.save()
        .then(response => res.send({ message: response }))
        .catch(err => res.send({ error: err }))

}