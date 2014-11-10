var express = require('express'),
  logfmt = require('logfmt'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  config = require('./config')('prod'),
  app = express();

app.use(logfmt.requestLogger());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

mongoose.connect(config.db('big_data'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});


require('./facebook')(app);
require('./local')(app);
require('./api')(app);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
