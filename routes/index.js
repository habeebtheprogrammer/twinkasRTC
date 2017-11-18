var express = require('express');
var Router = express.Router();
var passport = require('passport');
const userModel = require('../model/user');
passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});
passport.deserializeUser(function (id, done) {
    done(null, id)
});
function securePage (req,res,next){
    if(req.isAuthenticated()) {
        next()}else res.redirect('/login')
}
Router.get('/',securePage, function (req,res,next) {
    console.log(req.user)
    res.render("index");
});

Router.get('/chat', securePage, function (req, res, next) {
    res.render("chat")
})
Router.get('/logout', securePage, function (req, res, next) {
    req.logout();
    res.redirect('/login')
})
Router.get('/login', function (req, res, next) {
    res.render("login");
});
Router.get('/signup', function (req, res, next) {
    res.render("signup");
});

Router.get('/videocall', securePage, function (req, res, next) {
    res.render("video")
})

Router.get('/auth/facebook', passport.authenticate('facebook'));
Router.get('/auth/facebook/callback', passport.authenticate("facebook", {
    failureRedirect: "/login"
}), function (req, res) {
    res.redirect('/chat');
});

Router.post('/auth/signup',function(req,res,next){
     userModel.find().then((a)=>console.log(a))
 
    userModel.findOne({username:req.body.username,email:req.body.email}).then(function (user) { 
        if(user === null){
            console.log(req.body)
            var person = new userModel({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });
            person.save().then((user) => res.redirect('/login') )
        } else res.redirect('/signup') });
});

Router.post('/auth/signin', function (req, res, next) {
    userModel.findOne({ username: req.body.username,password:req.body.password }).then(function (user) {
        if(user === null) res.redirect('/login'); else {
            req.login(user,function(err){
                if(err) console.log(err);
                res.redirect('/videocall');
            }); 
        }
    });
});


module.exports = Router