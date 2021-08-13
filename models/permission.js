var mongoose = require("mongoose");

var permissionSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model("Permission", permissionSchema);