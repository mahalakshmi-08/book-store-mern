let mongoose = require('mongoose');
let bookSch = new mongoose.Schema({
    "_id":{
        type:String,
        required:true
    },
    "bookTitle":{
        type:String,
        required:true
    },
    "authorName":{
        type:String,
        required:true
    },
    "imageUrl":{
        type:String,
        required:true
    },
    "category":String,
    "bookDescription":{
        type:String,
        required:true
    },
    "bookInfo":String

})

module.exports = mongoose.model("Book", bookSch )