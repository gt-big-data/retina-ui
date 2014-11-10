var express = require('express'),
  logfmt = require('logfmt'),
  request = require('request'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  stub = require('./stub.json'),
  filter = require('./filter'),
  config = require('./config')('dev'),
  app = express();

app.use(logfmt.requestLogger());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

// mongoose.connect('mongodb://localhost/users');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {});


// require('./facebook')(app, mongoose, config);
// require('./local')(app, mongoose);
require('./api')(app);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
