
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = ('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

//Connects express server to our Mongodb
require('./src/database.js');

var router = require('./src/api');
//var users = require('./routes/users');

// Init App
var app = express();

//Configures Passport Strategy




//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', router);
//app.use('/users', users);

app.listen(8080, function(){
  console.log("Web Server is running on port 8080")
});
