//Every function that handles a database operation is stored here for the sake of simplicity.

const mongoose    = require("mongoose"),
    User        = require('../models/user'),
    Permission = require('../models/permission')

mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/certichallenge", { useNewUrlParser: true, useUnifiedTopology: true });

exports.list = list;