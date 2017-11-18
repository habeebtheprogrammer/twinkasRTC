var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: { required: true, type: String },
    password: { required: true, type: String },
    email: { required: true, type: String }

});

var userModel = mongoose.model("user", userSchema);

module.exports = userModel;