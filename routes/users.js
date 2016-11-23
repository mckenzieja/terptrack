var express = require('express');
var router = express.Router();

var user = require('../src/models/users');

//Register
var newUser = new User({
  email: email,
  name: name,
  password: password,
  img: {
    data: data;
    contentType: contentType;
    path: path;

  }
});

User.createUser(newUser, function(err, user){
  if(err) throw err;
  console.log(user);
});



exports.module = users;
