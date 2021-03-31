const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    Day:{
        type:Number,
        required:true
      },
      Timestamp:{
        type:Number,
        required:true
  
      },
      TotalConfirmed:{
          type:Number,
          required:true
      },
      TotalDeaths:{
          type:Number,
          required:true
      },
      DailyConfirmed:{
          type:Number,
          required:true
      },
      DailyDeaths:{
          type:Number,
          required:true
      }

})

module.exports = mongoose.model('Total_World_Covidcase', Schema);