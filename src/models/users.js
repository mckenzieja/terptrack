var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');






// User Schema
var UserSchema = mongoose.Schema({
    email: {type: String, unique: true},
    name: String,
    password: String,
    photo: String

});

var model = mongoose.model('Users', UserSchema);
module.exports = model;
/*
var User = module.exports = mongoose.model('User', UserSchema);


module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        newUser.password = hash;
        newUser.save(callback);
      });
    });
}
*/
