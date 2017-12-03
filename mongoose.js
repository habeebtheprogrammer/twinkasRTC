var config = require("./config/config");


var mongoose = require("mongoose");
mongoose.connect("mongodb://guest:guest@ds159845.mlab.com:59845/twinkasrtc", { useMongoClient: true }).then((success)=>console.log(success),(failed)=>console.log(failed)).catch((failed)=>console.log(`error elsewhere: ${failed}`))
module.exports = mongoose;