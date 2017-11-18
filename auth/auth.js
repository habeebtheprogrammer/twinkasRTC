module.exports = function (app,passport,fbStrategy,config,mongoose) {  
    var userSchema = mongoose.Schema({
        username: {required:true,type:String},
        password: { required: true, type: String }
    });

    var userModel = mongoose.model("user",userSchema);
    passport.serializeUser(function (user,done) {
        done(null,user.id)
    });
    passport.deserializeUser(function (id, done) {
        userModel.findById(id).then(function (id) { done(null,id) },function (err) { done(err) });
    });
    passport.use('fb.strategy',new fbStrategy({
        clientID: config.fb.appID,
        clientSecret: config.fb.appSecret,
        callbackURL: config.fb.callback,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },function (accessToken,refreshToken,profile,done) { 
        userModel.findOne({facebookId: profile.id}).then(function(user){
            done(null,user);
        },function (err) {
            done(err);
        });
    }))
    
}