var mongoose = require("mongoose");

var permissionSchema = new mongoose.Schema({
    name: String,
    description: String,
    hidden: Boolean
});

module.exports = mongoose.model("Permission", permissionSchema);