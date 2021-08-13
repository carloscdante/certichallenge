var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    age: Number,
    username: String,
    permissions: Array,
    hidden: Boolean,
    uid: Number
});

module.exports = mongoose.model("User", userSchema);