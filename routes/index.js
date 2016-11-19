'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var Users = require('../src/models/users');
var fs = require('fs');
var multer = require('multer');



//Get Homepage
app.use('/', express.static('public'));





//GET route to pull all User Data
router.get('/secret', function(req, res){
  Users.find({}, function(err, users){
    if (err) {
      return res.status(500).json({message: err.message});
    }
    res.json({users: users});
  });
});

//Remove user from database
router.post('/remove', function(req, res){
  var data = req.body.id;
  Users.remove({_id: data}, function (err){
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    else {
      res.status(200).send("successfully removed " + data);
    }
  });
});

//Add POST route to create NEW USER.
router.post('/register', function(req, res){
  var email = req.body.email;
  var newUser = req.body;
  //Checks against Mongodb for existing email
  Users.findOne({email: email}, function(err, result){
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (result) {
      return res.status(404).send();
    }
      Users.create(newUser, function(err, result){
      if(err){
        console.log(err);
        return res.status(500).send();
      }
        return res.status(200).json(result);

    });
  });
});

//LOGIN Post Route
router.post('/login', function(req, res){
  var userEmail = req.body.email;
  var password = req.body.pass;
  //checks the database for verification
  Users.findOne({email: userEmail, password: password}, function(err, login){
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    else if(!login) {
      return res.status(404).send();
    }
    res.status(200).send(login);
    });
  });
//Change destination path to a folder in your directory
var upload = multer({dest: '../uploaded_imgs'});

//UPLOADS IMAGE FILE BUT DOESNT UPDATE THE PATH ON THE USER DOCUMENT!
router.put('/img/:email', upload.single('file'), function (req, res){
  var id = req.params.email;
  var file = req.file;
  Users.findOne({email: id}, function(err, data){
    if (err){
      res.status(500).send(id);
      throw err;
    }
    else if (!data){
      res.status(404).send("User not found!");
    }
      Users.update({email: data.email},
      {$set : {path : 'C:/Users/Master/Dropbox/Terptrack/mock/uploadedimage/' + file.name}

  });
  res.status(200).send("Upload Success");
});


});





module.exports = router;
