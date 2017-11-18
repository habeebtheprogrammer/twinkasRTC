var config = process.env.PORT ? require("./"+process.env.NODE_ENV+".json") : require("./development.json");
module.exports = config
