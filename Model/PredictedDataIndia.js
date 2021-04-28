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
    recovered:{
        type:Number
    }

});

module.exports = mongoose.model("forecasted_total_india_covidcases",Predicted_Schema);