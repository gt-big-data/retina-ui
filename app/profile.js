var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config')('prod');
var db = mongoose.createConnection(config.db('big_data'));
var userSchema = require('./models/users.js').userSchema;
var users =  db.model('users', userSchema);

exports.updatePreferences = function(req, res) {
    var pref = req.param('preferences');
    users.findOneAndUpdate(
        {'uid': req.user},
        {
            $push: {'categories': pref.categories},
            $push: {'keywords': pref.keywords},
        },
        {limit:20},
        function(err, doc) {
            res.json(doc);
        }
    );
}

exports.saveArticle = function(req, res ) {
    var pref = req.param('preferences');
    users.findOneAndUpdate(
        {'uid': pref.uid},
        {
            $push: {'articles': pref.article},
        },
        {},
        function(err, doc) {
            res.json(doc);
        }
    );
}