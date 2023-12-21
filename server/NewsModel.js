const mongoose = require("mongoose");
const Schema = mongoose.Schema
const carScheme = new Schema({
    authorName: String,
    newsName: String,
    text: String
});


exports.model = mongoose.model("News", carScheme);