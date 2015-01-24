"use strict"

var express = require('express');
var logfmt = require('logfmt');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('./app/auth/auth');
var routes = require('./app/routes');
var profile = require('./app/profile');
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
app.get('/api/articles/latest/:page', routes.getLatestArticles);
app.get('/api/articles/source/:source', routes.getArticlesBySource);
app.get('/api/articles/category/:category', routes.getArticlesByCategory);
app.get('/api/articles/keyword/:keyword', routes.getArticlesByKeyword);
app.get('/api/articles/id/:id', routes.getArticleById);
app.get('/api/articles/categories', routes.recentCategories);
app.get('/api/articles/keywords', routes.recentKeywords);
app.get('/api/articles/sources', routes.getSources);
app.get('/api/articles/data/keywords', routes.keywordCount);
app.get('/api/articles/data/categories', routes.categoryCount);
app.get('/users/profile', profile.getUserInfo);
app.post('/users/preferences/record', profile.recordView);
/*
    Passport initialization for facebook
*/
app.get('/users/auth/facebook', passport.authenticate('facebook'));
app.get('/users', 
    passport.authenticate('facebook', {
                                      failureRedirect: '/login' }),
    function(req, res) {
        res.cookie('retinaID', req.user.id);
        res.redirect('/#/profile');
    }
);

/*
    Passport initialization for google
/*/
app.get('/users/auth/google', passport.authenticate('google'));
app.get('/users/auth/google/callback', 
    passport.authenticate('google', { successRedirect: '/feed',
                                      failureRedirect: '/login' }));

var server = app.listen(5000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});

module.exports = app;