var express = require('express');
var Router = express.Router();

Router.get('/',function (req,res,next) {
    req.session.username = "olamide",
    res.render("index");
})

module.exports = Router