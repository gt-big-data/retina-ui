var express = require("express");
var logfmt = require("logfmt");
var request = require("request");
var stub = require('./stub.json');
var filter = require('./filter')
var app = express();
app.use(logfmt.requestLogger());
 
app.use(express.static(__dirname + '/public'));
 
app.get('/api/stub/',function(req, res){
  var articles = filter(stub, 10);
  res.json(articles);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
