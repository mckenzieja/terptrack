
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var multer = require('multer');
//Connects express server to our Mongodb
require('./src/database.js');

var router = require('./src/api');


// Init App
var app = express();

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', router);
//app.use('/users', users);

app.listen(8080, function(){
  console.log("Web Server is running on port 8080")
});
