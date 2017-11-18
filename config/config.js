var config = process.env.PORT ? require("./production.json") : require("./development.json");
module.exports = config
