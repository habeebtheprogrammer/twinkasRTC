var express = require('express');
var Router = express.Router();

Router.get('/',function (req,res,next) {
    res.render("chat")
})

module.exports = Router