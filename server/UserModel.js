const mongoose = require("mongoose");
const Schema = mongoose.Schema
const carScheme = new Schema({
    login: String,
    password: String,
    isAdmin: Boolean
});


exports.model = mongoose.model("User", carScheme);