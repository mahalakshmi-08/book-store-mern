let mongoose = require("mongoose")

let userSch = new mongoose.Schema({
    "_id":{
        type:String,
        required:true
    },
    "name":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "favorites":{
        type:String
    }
})

module.exports = mongoose.model("user",userSch)