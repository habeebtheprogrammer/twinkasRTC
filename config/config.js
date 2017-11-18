var config = process.env.NODE_ENV ? require("./"+process.env.NODE_ENV+".json") : require("./development.json");
module.exports = config
