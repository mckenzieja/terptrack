'use strict';
var express = require('express');
var router = express.Router();
var userlist = require('../../mock/userlist.json');
var app = express();
var Users = require('../models/users');

//Get Homepage
app.use('/', express.static('public'));


//GET route to pull User Data
router.get('/users', function(req, res){
  Users.find({}, function(err, users){
    if (err) {
      return res.status(500).json({message: err.message});
    }
    res.json({users: users});
  });
});

//Add POST route to create NEW USER.
router.post('/users', function(req, res){
  var email = req.body.email;
  //TODO: finish redundancy check
  Users.findOne({email: email}, function(err, newuser){
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (newuser) {
      return res.status(404).send();
    }
    User.create(newuser, function(err, newuser){
      if(err){
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    });
  });
});


//LOGIN Post Route
router.post('/login', function(req, res){
  var userEmail = req.body.email;
  var password = req.body.pass;
  //checks the database for verification
  Users.findOne({email: userEmail, password: password}, function(err, login){
    var urlname = encodeURIComponent(login.name);
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if(!login) {
      return res.status(404).send();
    }
    //REDIRECT?
    return res.status(200).send();
  });

    });






//TODO: Add PUT route to update User Data.

//TODO: Add Delete route to DELETE User Data.




/*
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
*/
module.exports = router;
