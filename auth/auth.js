module.exports = function (app,passport,fbStrategy,config,mongoose) {  
    var userSchema = mongoose.Schema({
        username: String,
        password: String
    });
    var userModel = mongoose.model("user",userSchema);
    passport.serializeUser(function (user,cb) {
        cb(null,user.id)
    })
    passport.deserializeUser(function (id, cb) {
        userModel.findById(id,function (err,user) { 
            cb(err,user)
         })
    })
    passport.use(new fbStrategy({
        clientID: config.fb.appID,
        clientSecret: config.fb.appSecret,
        callbackURL: config.fb.callback,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },function (accessToken,refreshToken,profile,cb) { 
        userModel.find({facebookId: profile.id},function(err,result){
            return cb(err,result);
        });
     }))
}