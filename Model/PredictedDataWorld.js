const mongoose = require('mongoose');

const Predicted_Schema = mongoose.Schema({
    Date:{
        type:Date
    },
    confirmed:{
        type:Number
    },
    deaths:{
        type:Number
    },
});

module.exports = mongoose.model("forecasted_total_world_covidcases",Predicted_Schema);