const mongoose = require('mongoose')
const IndiaSchema = mongoose.Schema({
    active:{
        type:String,
        required:true
    },
    confirmed:{
        type:String,
        required:true
    },
    deaths:{
        type:String,
        required:true
    },
    deltaconfirmed:{
        type:String,
        required:true
    },
    deltadeaths:{
        type:String,
        required:true
    },
    deltarecovered:{
        type:String,
        required:true
    },
    lastupdatedtime:{
        type:Date,
        required:true
    },
    migratedother:{
        type:String,
        required:true
    },
    recovered:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    statecode:{
        type:String,
        required:true
    },
    statenotes:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model(`Covid_Data_India_`,IndiaSchema);