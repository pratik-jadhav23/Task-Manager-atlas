const mongoose = require("mongoose");

const usersch = new mongoose.Schema({
    "_id":String,
    "pass":String,
    "username":String
})

const user = mongoose.model('tmusers',usersch)

module.exports = user