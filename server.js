'use strict'
var express = require('express');
var hbs = require('hbs');
var path =require('path')
var app = express();
var routes = require('./routes/index')
var config = require("./config/config");
var session = require('express-session');
var http = require('http')
var connectMongo = require('connect-mongo')(session);
var passport = require("passport");
var fbStrategy = require("passport-facebook");
var mongoose = require('./mongoose');
var bodyParser = require('body-parser');
hbs.registerPartials(path.join(__dirname,'views/partials'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "html");

app.engine('html', require('hbs').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({
    extended:true,
    urlencoded: true,
    json : true
}))

app.use(session({
    secret: "alsdfjaklasdf",
    saveUninitialized:true,
    resave: false,
    store: new connectMongo({
        mongooseConnection: mongoose.connection,
        stringify: true
    }) 
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req,res,next) { 
    res.locals.user = req.user || null;
    next();
 });

process.env.PORT ? require('./auth/auth')(app,passport,fbStrategy,config,mongoose):null
// require('./auth/localStrategy');
app.use('/',routes);
app.listen(process.env.PORT || 3001,()=>console.log('server listening at port 3001'))