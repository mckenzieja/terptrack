var express = require('express');
var router = express.Router();

var user = require('../src/models/users');

//Register
var newUser = new User({
  name: name,
  email: email,
  password: password
});

User.createUser(newUser, function(err, user){
  if(err) throw err;
  console.log(user);
});



exports.module = users;
