const passport = require('passport');
var localStrategy = require('passport-local');
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type:String,required:true},
    password: { type: String, required: true }
});
var userModel = mongoose.model('user',userSchema);

passport.serializeUser(function (user,done) {  
    done(null, user);
});
passport.deserializeUser(function (user,done) { 
    userModel.findById({username:user.id}).then(function (user) { 
        done(null,user)
     },function (err) { done(err) });
 });
passport.use('local.strategy',new localStrategy({
    usernameField : "username",
    passwordField : "password",
    pasReqToCallback : true
},function (req,username,password,done) {  
    userModel.findOne({username: username}).then(function () {
        done(null,false,{message: "User already exits"});
      });
    const person = new userModel({
        username: req.body.username,
        password: req.body.password
    });
    person.save().then(function (user) { done(null,user) })
    
}))