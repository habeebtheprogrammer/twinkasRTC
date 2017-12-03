var config = require("./config/config");

var mongoose = require("mongoose").connect(config.dbURL, { useMongoClient: true }).then((success)=>console.log(success),(failed)=>console.log(failed)).catch((failed)=>console.log(`error elsewhere: ${failed}`))
module.exports = mongoose;