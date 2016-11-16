'use strict';

var users = require('./models/users.js');

var Users = [
  {
    "name": "josh",
    "email": "josh@josh.com",
    "pass": "pass1"
  }
];


Users.forEach(function(todo, index){
  Todo.find({'name': Users}, function (err, Users){
    if(!err && !Users.length) {
      users.create({completed: false, name: user});
      //creates new record
    }

  });
});
