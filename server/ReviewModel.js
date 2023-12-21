const mongoose = require("mongoose");
const Schema = mongoose.Schema
const carScheme = new Schema({
    user: Number,
    rate: Number,
    text: String
});

exports.model = mongoose.model("review", carScheme);