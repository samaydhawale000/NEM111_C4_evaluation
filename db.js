const mongoose = require("mongoose");

const dbConnection  = mongoose.connect("mongodb+srv://samaydhawale1:Samay123@cluster0.fcetjfm.mongodb.net/c4_evaluation?retryWrites=true&w=majority")
module.exports = dbConnection