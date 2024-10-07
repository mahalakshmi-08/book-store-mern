let mongoose = require('mongoose')
let adminSch = new mongoose.Schema({
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
})

module.exports = mongoose.model("Admin", adminSch )