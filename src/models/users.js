var mongoose = require('mongoose');






// User Schema
var UserSchema = mongoose.Schema({
    email: {type: String, unique: true},
    name: String,
    password: String,
    img: {
      data: Buffer,
      contentType: String,
      path: String
    }

});

var model = mongoose.model('Users', UserSchema);
module.exports = model;
