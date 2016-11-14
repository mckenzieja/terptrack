
var http = require('http');
var express = require('express');

var path = require('path');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});



app.listen(8080, function(){
  console.log("Web Server is running on port 8080")
});
