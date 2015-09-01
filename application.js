"use strict"

var express = require('express');
var logfmt = require('logfmt');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db('big_data'));
var passport = require('./app/auth/auth');
var app = express();

app.use(logfmt.requestLogger());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'super secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.set('X-Powered-By', 'Retina News');
    next();
});
app.use(express.static(__dirname + '/public'));

var articleRouteHandlers = require('./app/article_routes')(app);
var userRouteHandlers = require('./app/user_routes')(app);

/*
    Passport initialization for facebook
*/
app.get('/users/auth/facebook', passport.authenticate('facebook'));
app.get('/users',
    passport.authenticate('facebook', {
                                      failureRedirect: '/login' }),
    function(req, res) {
        res.cookie('retinaID', req.user.id,
            {expires: new Date(Date.now() + 9000000)});
        res.redirect('/#/main/feed');
    }
);
module.exports = app;