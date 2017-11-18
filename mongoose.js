var config = require("./config/config");

var mongoose = require("mongoose").connect(config.dbURL, { useMongoClient: true });
module.exports = mongoose;