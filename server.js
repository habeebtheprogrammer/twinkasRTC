'use strict'
var express = require('express');
var hbs = require('hbs');
var path =require('path')
var app = express();
var index = require('./routes/index')
var vids = require('./routes/video');
var chat = require('./routes/chat')
var login = require('./routes/login')
var config = require("./config/config");
var session = require('express-session');
var mongoose = require("mongoose").connect(config.dbURL);
var connectMongo = require('connect-mongo')(session);
var passport = require("passport");
var fbStrategy = require("passport-facebook");
app.use(session({
    secret: "alsdfjaklasdf",
    saveUninitialized:true,
    resave: false,
    store: new connectMongo({
        mongooseConnection: mongoose.connection,
        stringify: true
    })
}));
app.use(passport.initialize());
app.use(passport.session())
require('./auth/auth')(app,passport,fbStrategy,config,mongoose);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate("facebook", {
    failureRedirect: "/login"
}), function (req, res) {
    res.redirect('/chat')
})

app.use(express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine',"html")
app.engine('html', require('hbs').__express);
app.use('/',index);
app.use('/videocall',vids)
app.use('/chat', chat)
app.use('/login',login);

app.listen(process.env.PORT || 3001,()=>console.log('server listening at port 3000'))