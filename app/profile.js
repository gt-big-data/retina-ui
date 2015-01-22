var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config');
var db = mongoose.createConnection(config.db('big_data'));
var userSchema = require('./models/users.js').userSchema;
var users =  db.model('users', userSchema);

exports.getUserInfo = function(req, res) {
    users.findOne(
        {'_id': req.cookies.retinaID},
        '-_id -uid',
        function(err, doc) {
            res.json(doc);
        });
};

exports.updatePreferences = function(req, res) {
   var title = req.param('title');
   var type = req.param('type');
    users.findOneAndUpdate(
        {'_id': req.cookies.retinaID},
        {$push: {type: title}},
        {},
        function(err, doc) {
            res.send(200);
        }
    );

};

exports.recordView = function(req, res) {
    var articleID = req.param('article');
    console.log(articleID);
    users.findOneAndUpdate(
        {'_id': req.cookies.retinaID},
        {$push:{'articles': articleID}},
        {},
        function(err, docs) {
            res.send(200);
        });
};

exports.deleteItem = function(req, res) {
    var title = req.param('title');
    var type = req.param('type');

    users.findOneAndUpdate(
        {'_id': req.cookies.retinaID},
        {
            $pull: {type: title}
        },
        {},
        function(err, docs) {
            res.send(200);
        });
};

