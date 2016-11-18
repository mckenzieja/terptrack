'use strict';

var mongoose = require('mongoose');

//Connects Express to mongodb path
mongoose.connect('mongodb://localhost/terpTrack', function (err) {
  if (err) {
    console.log('Failed connecting to Mongodb');

  }else {
    console.log('Successfully connected to the database');
  }
});
