'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var Users = require('../src/models/users');
var fs = require('fs');
var multer = require('multer');
var mongoose = require('mongoose');
var path = require('path');


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


//FILE STREAM
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploaded_imgs')
  },
  filename: function (req, file, cb) {
    var jpg = 'jpeg';
    if (file.mimetype == 'image/jpeg'){
      cb(null, file.fieldname + '-' + Date.now() + '.jpeg');
    }

  }
});

//Change destination path to a folder in your directory
var upload = multer({ storage: storage});

//UPLOADS PROFILE IMAGE IN A FOLDER IN THE DIRECTORY
router.post('/img/:email', upload.single('file'),function (req, res){
  var id = req.params.email;
  var file = req.file;
  var imgpath = file.filename;
  Users.findOneAndUpdate({email: id}, {$set:
    {img:{
      path: imgpath
    }}}, {upsert:true}, function(err, doc){
    if (err){
      res.status(500).send(err);
    }
      res.status(200).send(imgpath);
     });

   });

//NOTE: Good for downlaoding files
/*
router.get('/img/:filename', function (req, res){
  var filename = req.params.filename;
  res.sendFile(path.join(__dirname,'../uploaded_imgs/', filename));
});
*/




module.exports = router;
