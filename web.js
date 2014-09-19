var express = require("express");
var logfmt = require("logfmt");
var request = require("request");
var stub = require('./stub.json');
var filterArticles = require('./filter')
var app = express();
app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/public'));

app.get('/api',function(req,res){
	request("http://api.ihackernews.com/page", function(err,response,body){
		res.send(body)
	});
});

app.get('/stub/:size',function(req, res){
  var articles = filterArticles(stub, +req.params.size);
  res.json(articles);
})

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});