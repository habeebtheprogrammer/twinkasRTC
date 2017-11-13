var express = require('express');
var Router = express.Router();

Router.get('/',function (req,res,next) {
    console.log(req.session.username)
    res.render("video")
})

module.exports = Router