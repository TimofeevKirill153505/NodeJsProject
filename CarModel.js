const mongoose = require("mongoose");
const Schema = mongoose.Schema
const carScheme = new Schema({
    mark: String,
    type: String,
    priceForHour: Number
});


exports.model = mongoose.model("Car", carScheme);